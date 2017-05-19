
import { isDefined, isUndefined, isNumber, isBoolean } from "utils/types";
import { PropertyMetadata } from "ui/core/proxy";
import { Property, PropertyChangeData, PropertyMetadataSettings } from "ui/core/dependency-observable";
import { View } from "ui/core/view";
import { Color } from "color";
import { fromResource } from "image-source";
import { Bindable } from "ui/core/bindable";
import { EventData } from "data/observable";
import { isAndroid } from "platform";
import { TITLE_STATE, BottomBarCommon, BottomBarItemInterface, Notification } from "../common";


let AffectsLayout = isAndroid ? PropertyMetadataSettings.None : PropertyMetadataSettings.AffectsLayout;

declare let com, android: any;

let BitmapDrawable = android.graphics.drawable.BitmapDrawable;
let AHBottomNavigation = com.aurelhubert.ahbottomnavigation.AHBottomNavigation; /// https://github.com/aurelhubert/ahbottomnavigation/blob/master/ahbottomnavigation/src/main/java/com/aurelhubert/ahbottomnavigation/AHBottomNavigation.java#L1
let AHBottomNavigationItem = com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem; /// https://github.com/aurelhubert/ahbottomnavigation/blob/master/ahbottomnavigation/src/main/java/com/aurelhubert/ahbottomnavigation/AHBottomNavigationItem.java#L86
let AHNotification = com.aurelhubert.ahbottomnavigation.notification.AHNotification;


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
            this._parent.get().changeItemTitle(this._index, this._title);
        }
    }

    public get icon(): string {
        return this._icon;
    }

    public set icon(value: string) {
        if (this._icon !== value && value && this._parent) {
            this._icon = value;
            this._parent.get().changeItemIcon(this._index, this._icon);
        }
    }

    public get color(): string {
        return this._color
    }

    public set color(value: string) {
        if (this._color !== value && value && this._parent) {
            this._color = value;
            this._parent.get().changeItemColor(this._index, this._color);
        }
    }

    public get notification(): Notification {
        return this._notification;
    }

    public set notification(value: Notification) {
        if (this._notification !== value && value && this._parent) {
            this._notification = value;
            if (this._notification.value !== "") {
                let newNotification = new AHNotification.Builder()
                    .setText(this._notification.value)
                    .setBackgroundColor(new Color(this._notification.backgroundColor).android)
                    .setTextColor(new Color(this._notification.textColor).android)
                    .build();
                this._parent.get().android.setNotification(newNotification, this._index);
            } else {
                this._parent.get().android.setNotification("", this._index);
            }
        }
    }

    public get parent(): WeakRef<BottomBar> {
        return this._parent;
    }

    public set parent(parent: WeakRef<BottomBar>) {
        this._parent = parent;
    }
}


export class BottomBar extends BottomBarCommon {
    private _android: any;
    public _listener: any;

    get android(): any {
        return this._android;
    }

    get _nativeView(): any {
        return this._android;
    }


    get currentIndex(): number {
        return this._android.getCurrentItem();
    }

    public _createUI() {

        this._android = new AHBottomNavigation(this._context);

        let that = new WeakRef(this);

        this._listener = new AHBottomNavigation.OnTabSelectedListener({
            onTabSelected: function (position: number, wasSelected: boolean): boolean {
                let bar = that.get();
                let oldIndex = bar.selectedIndex;
                if (bar && bar.selectedIndex !== position) {
                    bar.selectedIndex = position;
                }
                return true;
            }
        });

        this._android.setOnTabSelectedListener(null);
        this._android.setOnTabSelectedListener(this._listener);

        //always show title
        let owner = that.get();
        if (isDefined(owner.titleState)) {
            this.setTitleStateNative(owner.titleState);
        } else {
            this._android.setTitleState(AHBottomNavigation.TitleState.ALWAYS_SHOW);
        }

        // Set background color
        this._android.setDefaultBackgroundColor(new Color('#FFFCFF').android);

        // Use colored navigation with circle reveal effect
        this._android.setColored(true);

    }

    public _onItemsPropertyChangedSetNativeValue(data: PropertyChangeData) {
        let items = <Array<BottomBarItem>>data.newValue;
        this.createItems(items);

    }
    public createItems(items: Array<any>) {
        this._android.removeAllItems();
        items.forEach((item, idx, arr) => {
            let notif = item.notification;
            if (!notif) {
                notif = new Notification("white", "red", "");
            }
            this.items[idx] = new BottomBarItem(item.index, item.title, item.icon, item.color, notif, new WeakRef(this));
            let icon1 = new BitmapDrawable(fromResource(item.icon).android);
            let item1 = new AHBottomNavigationItem(item.title, icon1, new Color(item.color).android);
            this._android.addItem(item1);
            let newNotification = new AHNotification.Builder()
                .setText(notif.value)
                .setBackgroundColor(new Color(notif.backgroundColor).android)
                .setTextColor(new Color(notif.textColor).android)
                .build();
            this._android.setNotification(newNotification, idx)
        });
        if (this.selectedIndex != null) {
            this._android.setCurrentItem(this.selectedIndex);
        }
    }

    public changeItemTitle(index: number, title: string) {
        let item = this.items[index];
        if (item.title !== title) {
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

    public changeItemIcon(index: number, icon: string) {
        let item = this.items[index];
        if (item.icon !== icon) {
            this.items[index] = item;
        }
        this.createItems(this.items);
    }


    public _titleStatePropertyChangedSetNativeValue(data: PropertyChangeData) {
        super._titleStatePropertyChangedSetNativeValue(data);
        let newTitleState = data.newValue;
        this.setTitleStateNative(newTitleState);
    }

    private setTitleStateNative(newTitleState: TITLE_STATE) {
        switch (newTitleState) {
            case TITLE_STATE.ALWAYS_SHOW:
                this._android.setTitleState(AHBottomNavigation.TitleState.ALWAYS_SHOW);
                break;
            case TITLE_STATE.SHOW_WHEN_ACTIVE:
                this._android.setTitleState(AHBottomNavigation.TitleState.SHOW_WHEN_ACTIVE);
                break;
            case TITLE_STATE.ALWAYS_HIDE:
                this._android.setTitleState(AHBottomNavigation.TitleState.ALWAYS_HIDE);
                break;
        }
    }

    public _hidePropertyChangedSetNativeValue(data: PropertyChangeData) {
        super._hidePropertyChangedSetNativeValue(data);
        let newHideValue = data.newValue;
        if (newHideValue) {
            this._android.hideBottomNavigation();
        } else {
            this._android.restoreBottomNavigation();
        }
    }

    public setNotification(value: string, index: number) {
        this._android.setNotification(value, index);
    }

    public _accentColorPropertyChangedSetNativeValue(data: PropertyChangeData): void {
        super._accentColorPropertyChangedSetNativeValue(data);
        let newAccentColorValue = data.newValue;
        this._android.setAccentColor(new Color(newAccentColorValue).android);
    }

    public _inactiveColorPropertyChangedSetNativeValue(data: PropertyChangeData): void {
        super._inactiveColorPropertyChangedSetNativeValue(data);
        let newInactiveColorValue = data.newValue;
        this._android.setInactiveColor(new Color(newInactiveColorValue).android);
    }

    public _coloredPropertyChangedSetNativeValue(data: PropertyChangeData): void {
        super._coloredPropertyChangedSetNativeValue(data);
        let newColoredValue: boolean = data.newValue;
        this._android.setColored(newColoredValue);
    }
}