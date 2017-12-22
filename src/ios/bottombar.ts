import {
    BottomBarBase,
    hideProperty,
    itemsProperty,
    SelectedIndexChangedEventData,
    TITLE_STATE,
    titleStateProperty,
    accentColorProperty,
    inactiveColorProperty,
    coloredProperty,
    uncoloredBackgroundColorProperty,
    Notification
} from "../common";
import { Color } from "tns-core-modules/color";
import { fromResource } from "tns-core-modules/image-source";
import { BottomBarItem } from "./bottombar-item";

declare const MiniTabBarItem, MiniTabBar, MiniTabBarBadge, MiniTabBarDelegate;


export class BottomBarDelegate extends NSObject {
    public static ObjCProtocols = [MiniTabBarDelegate];
    private _owner: WeakRef<BottomBar>;

    public static initWithOwner(owner: WeakRef<BottomBar>): BottomBarDelegate {
        let delegate = <BottomBarDelegate>BottomBarDelegate.new() as BottomBarDelegate;
        delegate._owner = owner;
        return delegate;
    }

    public tabSelected(index: number) {
        let bar = this._owner.get();
        bar.tabSelected(index);
    }
}

export class BottomBar extends BottomBarBase {
    private _delegate: BottomBarDelegate;

    constructor() {
        super();
        let items = new Array<any>();
        this.nativeView = new MiniTabBar({
            items: items,
            titleState: TITLE_STATE.SHOW_WHEN_ACTIVE
        });
        this.selectedIndex = 0;
        this._delegate = BottomBarDelegate.initWithOwner(new WeakRef(this));
        this.nativeView.frame = CGRectMake(0, 400, 400, 44);

        this.nativeView.tintColor = new Color("red").ios;

        // Change the font of the title label:
        this.nativeView.font = UIFont.systemFontOfSize(10);

        // Change the background & key line of the tab bar:
        this.nativeView.backgroundColor = new Color('black').ios;
        this.nativeView.backgroundBlurEnabled = false;
        this.nativeView.keyLine.isHidden = true;
    }

    get ios(): any {
        return this.nativeView
    }

    public onLoaded() {
        super.onLoaded();
        this.nativeView.delegate = this._delegate;
    }

    public onUnloaded() {
        this.nativeView.delegate = null;
        super.onUnloaded();
    }

    public disposeNativeView() {
        this._delegate = null;
    }

    [itemsProperty.setNative](value: BottomBarItem[]) {
        let items: BottomBarItem[] = <BottomBarItem[]>value;
        this.createItems(items);
    }

    public createItems(items: Array<BottomBarItem>) {
        let itemsMiniTabBar = new Array<BottomBarItem>();
        items.forEach((item) => {
            let notif = item.notification;
            if (!notif) {
                notif = new Notification("white", "red", "");
            }
            item.parent = new WeakRef(this);
            var imageSourceValue = fromResource(item.icon);
            let item1 = new MiniTabBarItem({
                title: item.title,
                icon: imageSourceValue.ios,
                badge: new MiniTabBarBadge(new Color(notif.backgroundColor).ios, new Color(notif.textColor).ios, notif.value),
                color: new Color(item.color).ios
            })
            itemsMiniTabBar.push(item1);
        });
        this.nativeView.setItems(itemsMiniTabBar);
    }

    [hideProperty.setNative](hide: boolean) {
        if (hide) {
            this.nativeView.hide();
        } else {
            this.nativeView.show();
        }
    }

    [titleStateProperty.setNative](titleState: TITLE_STATE) {
        this.nativeView.titleState = titleState;
    }


    [accentColorProperty.setNative](accentColor: string) {
        this.nativeView.tintColor = new Color(accentColor).ios;
    }

    [inactiveColorProperty.setNative](inactiveColor: string) {
        this.nativeView.inactiveColor = new Color(inactiveColor).ios;
    }

    [uncoloredBackgroundColorProperty.setNative](uncoloredBackgroundColor: string) {
        this.nativeView.uncoloredBackgroundColor = new Color(uncoloredBackgroundColor).ios;
    }

    [coloredProperty.setNative](colored: boolean) {
        this.nativeView.colored = colored;
    }

    public setNotification(value: string, index: number) {
        this.nativeView.changeBadgeItem(index, value);
    }
    public setBadge(badgeIndex: number, badgeValue: string) {
        this.nativeView.changeBadgeItem(badgeIndex, badgeValue);
    }

    public tabSelected(index: number) {
        var eventData: SelectedIndexChangedEventData = {
            eventName: "tabSelected",
            object: this,
            oldIndex: this.selectedIndex,
            newIndex: index
        }
        this.selectedIndex = index;
        this.notify(eventData);
    }

    public selectItemNative(index: number) {
        this.nativeView.selectItemAnimated(index, true);
    }

    public createCustomView() {
        /*let customItem;
        var imageProfile = new Image();
        var imageProfileSourceValue = fromResource('profile');
        let customButton = new Button().ios;
        customButton.backgroundColor = new Color("#FD7F24").ios;
        customButton.frame.size = new CGSize({ width: 50, height: 50 });
        customButton.layer.cornerRadius = 25;
        customButton.setBackgroundImageForState(imageProfileSourceValue.ios, 0);
        let offset = new UIOffset({ horizontal: 0, vertical: -10.0 });
        //console.dir(customButton);
        console.dir(offset);
        customItem = new MiniTabBarItem({ customView: customButton, offset });
       this.items.push(customItem);*/
    }
}