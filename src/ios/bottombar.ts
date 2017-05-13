import { View } from 'ui/core/view';
import { Image } from 'ui/image';
import { Color } from "color";
import { Button } from "ui/button";
import { Bindable } from "ui/core/bindable";
import { Property, PropertyChangeData, PropertyMetadataSettings } from "ui/core/dependency-observable";
import { PropertyMetadata } from "ui/core/proxy";
import { isUndefined, isDefined } from "utils/types";
import { TITLE_STATE, BottomBarItemInterface, BottomBarCommon, Notification } from "../common";

var imageSource = require("image-source");

//declare const MiniTabBarItem;
declare const MiniTabBarItem, MiniTabBar, MiniTabBarBadge, MiniTabBarDelegate;


export class BottomBarItem implements BottomBarItemInterface {
    private _index: number;
    private _title: string;
    private _icon: string;
    private _color: string;
    private _notification?: Notification;
    private _parent?: WeakRef<BottomBar>;
    constructor(index: number, title: string, icon: string, color: string, notification?: Notification, parent?: WeakRef<BottomBar>) {
        this._index = index;
        this._title = title;
        this._icon = icon;
        this._color = color;
        if (notification) {
            this._notification = notification;
        }
        if (parent) {
            this._parent = parent;
        }
    }
    public get index(): number {
        return this._index;
    }

    public set index(indexValue: number) {
        this._index = indexValue;
    }
    public get title(): string {
        return this._title;
    }

    public set title(value: string) {
        if (this._title !== value && value && this._parent) {
            this._title = value;
            //this._parent.changeItemTitle(this._index, this._title);
        }
    }

    public get icon(): string {
        return this._icon;
    }

    public set icon(value: string) {
        if (this._icon !== value && value && this._parent) {
            this._icon = value;
            //this._parent.changeItemIcon(this._index, this._icon);
        }
    }

    public get color(): string {
        return this.color;
    }

    public set color(value: string) {
        if (this._color !== value && value && this._parent) {
            this._color = value;
            //this._parent.changeItemColor(this._index, this._color);
        }
    }

    public get notification(): Notification {
        return this._notification;
    }

    public set notification(value: Notification) {
        if (this._notification !== value && value && this._parent) {
            this._notification = value;
            this._parent.get().ios.changeBadgeItem(this._index, this._notification.value);
        }
    }

    public get parent(): WeakRef<BottomBar> {
        return this._parent;
    }

    public set parent(parentValue: WeakRef<BottomBar>) {
        this._parent = parentValue;
    }
}


export class BottomBarDelegate extends NSObject {
    public static ObjCProtocols = [MiniTabBarDelegate];
    private _owner: WeakRef<BottomBar>;

    public static initWithOwner(owner: WeakRef<BottomBar>): BottomBarDelegate {
        let delegate = <BottomBarDelegate>BottomBarDelegate.new();
        delegate._owner = owner;
        return delegate;
    }

    public tabSelected(index: number) {
        let bar = this._owner.get();
        if (index !== bar.selectedIndex) {
            bar.selectedIndex = index;
        }
    }
}
export class BottomBar extends BottomBarCommon {
    private _ios: any;
    private _delegate: BottomBarDelegate;

    constructor() {
        super();
        let items = new Array<any>();
        this._ios = new MiniTabBar({
            items: items,
            titleState: TITLE_STATE.SHOW_WHEN_ACTIVE
        });
        this._delegate = BottomBarDelegate.initWithOwner(new WeakRef(this));
        this._ios.frame = CGRectMake(0, 400, 400, 44);
        /*var image = new Image();
        var imageSourceValue = imageSource.fromResource('ic_calendar');
        //image.imageSource = imageSourceValue;
        items.push(new MiniTabBarItem({
            title: "Calendar",
            icon: imageSourceValue.ios,
            badge: new MiniTabBarBadge(new Color('blue').ios, new Color('pink').ios, "1")
        }));
        imageSourceValue = imageSource.fromResource('ic_collaborator');
        items.push(new MiniTabBarItem({
            title: "Profile",
            icon: imageSourceValue.ios,
            badge: new MiniTabBarBadge(new Color('blue').ios, new Color('pink').ios, "2")
        }));
        imageSourceValue = imageSource.fromResource('ic_home_black_24dp');
        items.push(new MiniTabBarItem({
            title: "Home",
            icon: imageSourceValue.ios,
            badge: new MiniTabBarBadge(new Color('blue').ios, new Color('pink').ios, "3")
        }));
        imageSourceValue = imageSource.fromResource('ic_paperplane');
        items.push(new MiniTabBarItem({
            title: "Messages",
            icon: imageSourceValue.ios,
            badge: new MiniTabBarBadge(new Color('blue').ios, new Color('pink').ios, "3")
        }));
        /*let customItem;
        var imageProfile = new Image();
        var imageProfileSourceValue = imageSource.fromResource('profile');
        let customButton = new Button().ios;
        customButton.backgroundColor = new Color("#FD7F24").ios;
        customButton.frame.size = new CGSize({ width: 50, height: 50 });
        customButton.layer.cornerRadius = 25;
        customButton.setBackgroundImageForState(imageProfileSourceValue.ios, 0);
        let offset = new UIOffset({ horizontal: 0, vertical: -10.0 });
        //console.dir(customButton);
        console.dir(offset);
        customItem = new MiniTabBarItem({ customView: customButton, offset });
        items.push(customItem);*/

        this._ios.tintColor = new Color("red").ios;

        // Change the font of the title label:
        this._ios.font = UIFont.systemFontOfSize(10);

        // Change the background & key line of the tab bar:
        this._ios.backgroundColor = new Color('black').ios;
        this._ios.backgroundBlurEnabled = true;
        this._ios.keyLine.isHidden = false;
    }

    public _onItemsPropertyChangedSetNativeValue(data: PropertyChangeData) {
        super._onItemsPropertyChangedSetNativeValue(data);
        let items = <Array<BottomBarItem>>data.newValue;
        this.createItems(items);

    }
    public createItems(items: Array<BottomBarItem>) {
        ///this._ios.removeAllItems();
        let itemsMiniTabBar = new Array<BottomBarItem>();
        items.forEach((item) => {
            if (!item.notification) {
                item.notification = new Notification("white", "red", "");
            }
            item.parent = new WeakRef(this);
            var image = new Image();
            var imageSourceValue = imageSource.fromResource(item.icon);
            let item1 = new MiniTabBarItem({
                title: item.title,
                icon: imageSourceValue.ios,
                badge: new MiniTabBarBadge(new Color(item.notification.backgroundColor).ios, new Color(item.notification.textColor).ios, item.notification.value)
            })
            itemsMiniTabBar.push(item1);
        });
        this._ios.setItems(itemsMiniTabBar);
    }

    public _hidePropertyChangedSetNativeValue(data: PropertyChangeData) {
        let newHideValue = data.newValue;
        super._hidePropertyChangedSetNativeValue(data);
        if (newHideValue) {
            this._ios.hide();
        } else {
            this._ios.show();
        }
    }


    public _titleStatePropertyChangedSetNativeValue(data: PropertyChangeData) {
        super._titleStatePropertyChangedSetNativeValue(data);
        let newTitleState = data.newValue;
        this._ios.titleState = newTitleState;
    }

    public setBadge(badgeIndex: number, badgeValue: string) {
        this._ios.changeBadgeItem(badgeIndex, badgeValue);
    }

    public get ios() {
        return this._ios;
    }

    public get _nativeView() {
        return this._ios;
    }

    onLoaded() {
        super.onLoaded();
        this._ios.delegate = this._delegate;
    }
}