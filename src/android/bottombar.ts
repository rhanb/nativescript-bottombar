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
    Notification,
    uncoloredBackgroundColorProperty
} from "../common";
import { BottomBarItem } from "./bottombar-item";
import { Color } from "tns-core-modules/color";
import { fromResource } from "tns-core-modules/image-source";


declare let com, android: any;


let BitmapDrawable = android.graphics.drawable.BitmapDrawable;
let AHBottomNavigation = com.aurelhubert.ahbottomnavigation.AHBottomNavigation;
let AHBottomNavigationItem = com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem;
let AHNotification = com.aurelhubert.ahbottomnavigation.notification.AHNotification;

export class BottomBar extends BottomBarBase {

    get android(): any {
        return this.nativeView;
    }

    public createNativeView() {

        let nativeView = new AHBottomNavigation(this._context);

        let that = new WeakRef(this);

        this.selectedIndex = 0;

        nativeView.setOnTabSelectedListener(new AHBottomNavigation.OnTabSelectedListener({

            get owner(): BottomBar {
                return that.get();
            },
            onTabSelected: function (position: number, wasSelected: boolean): boolean {

                if (this.owner) {

                    var eventData: SelectedIndexChangedEventData = {
                        eventName: "tabSelected",
                        object: this,
                        oldIndex: this.owner.selectedIndex,
                        newIndex: position
                    }

                    this.owner.selectedIndex = position;
                    this.owner.notify(eventData);
                }

                return true;
            }
        }));

        nativeView.setDefaultBackgroundColor(new Color('#333').android);
        nativeView.setColored(true);

        return nativeView;
    }

    [itemsProperty.setNative](value: BottomBarItem[]) {
        let items: BottomBarItem[] = <BottomBarItem[]>value;
        this.createItems(items);
    }

    [titleStateProperty.setNative](titleState: TITLE_STATE) {
        switch (titleState) {
            case TITLE_STATE.ALWAYS_SHOW:
                this.nativeView.setTitleState(AHBottomNavigation.TitleState.ALWAYS_SHOW);
                break;
            case TITLE_STATE.SHOW_WHEN_ACTIVE:
                this.nativeView.setTitleState(AHBottomNavigation.TitleState.SHOW_WHEN_ACTIVE);
                break;
            case TITLE_STATE.ALWAYS_HIDE:
                this.nativeView.setTitleState(AHBottomNavigation.TitleState.ALWAYS_HIDE);
                break;
        }
    }

    [hideProperty.setNative](hide: boolean) {
        if (hide) {
            this.nativeView.hideBottomNavigation();
        } else {
            this.nativeView.restoreBottomNavigation();
        }
    }

    [accentColorProperty.setNative](accentColor: string) {
        this.nativeView.setAccentColor(new Color(accentColor).android);
    }

    [inactiveColorProperty.setNative](inactiveColor: string) {
        this.nativeView.setInactiveColor(new Color(inactiveColor).android);
    }

    [coloredProperty.setNative](colored: boolean) {
        this.nativeView.setColored(colored);
    }

    [uncoloredBackgroundColorProperty.setNative](uncoloredBackgroundColor: string) {
        this.nativeView.setDefaultBackgroundColor(new Color(uncoloredBackgroundColor).android);
    }

    public changeItemTitle(index: number, title: string) {
        let item = this.items[index];
        if (item.title !== title) {
            this.items[index] = item;
        }
        this.createItems(this.items);
    }

    public changeItemIcon(index: number, icon: string) {
        let item = this.items[index];
        if (item.icon !== icon) {
            this.items[index] = item;
        }
        this.createItems(this.items);
    }

    public changeItemColor(index: number, color: string) {
        let item = this.items[index];
        if (item.color !== color) {
            this.items[index] = item;
        }
        this.createItems(this.items);
    }

    public selectItemNative(index: number) {
        this.nativeView.setCurrentItem(this.selectedIndex);
    }

    private createItems(items: BottomBarItem[]) {

        this.nativeView.removeAllItems();
        items.forEach((item, idx, aar) => {
            let notif = item.notification;
            if (!notif) {
                notif = new Notification("white", "red", "");
            }
            this.items[idx] = new BottomBarItem(item.index, item.title, item.icon, item.color, notif, new WeakRef(this));
            let icon1 = new BitmapDrawable(fromResource(item.icon).android);
            let item1 = new AHBottomNavigationItem(item.title, icon1, new Color(item.color).android);
            this.nativeView.addItem(item1);
            let newNotification = new AHNotification.Builder()
                .setText(notif.value)
                .setBackgroundColor(new Color(notif.backgroundColor).android)
                .setTextColor(new Color(notif.textColor).android)
                .build();
            this.nativeView.setNotification(newNotification, idx)
        });

        this.nativeView.setCurrentItem(this.selectedIndex);
    }

    public setNotification(value: string, index: number): void {
        this.nativeView.setNotification(value, index);
    }



}

