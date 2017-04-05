import { isDefined, isUndefined, isNumber, isBoolean } from "utils/types";
import { PropertyMetadata } from "ui/core/proxy";
import { Property, PropertyChangeData, PropertyMetadataSettings } from "ui/core/dependency-observable";
import { View } from "ui/core/view";
import { Color } from "color";
import { fromResource } from "image-source";
import { Bindable } from "ui/core/bindable";
import { EventData } from "data/observable";
import { isAndroid } from "platform";


let AffectsLayout = isAndroid ? PropertyMetadataSettings.None : PropertyMetadataSettings.AffectsLayout;

declare let com, android: any;

let BitmapDrawable = android.graphics.drawable.BitmapDrawable;
let AHBottomNavigation = com.aurelhubert.ahbottomnavigation.AHBottomNavigation; /// https://github.com/aurelhubert/ahbottomnavigation/blob/master/ahbottomnavigation/src/main/java/com/aurelhubert/ahbottomnavigation/AHBottomNavigation.java#L1
let AHBottomNavigationItem = com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem; /// https://github.com/aurelhubert/ahbottomnavigation/blob/master/ahbottomnavigation/src/main/java/com/aurelhubert/ahbottomnavigation/AHBottomNavigationItem.java#L86
let AHNotification = com.aurelhubert.ahbottomnavigation.notification.AHNotification;

export interface SelectedIndexChangedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}

export class BottomBarItem extends Bindable {
    private _title: string;
    private _icon: string;
    private _color: string;
    private _notification: string;
    private _index: number;
    private _parent: BottomBar;

    constructor(index, title, icon, color, notification?, parent?) {
        super();
        this._index = index;
        this._title = title;
        this._icon = icon;
        this._color = color;
        if (parent) {
            this._parent = parent;
        }
        if (notification) {
            this._notification = notification;
        }
    }

    public get index(): number {
        return this._index;
    }

    public set index(indexValue: number) {
        if (indexValue !== this._index && indexValue) {
            this._index = indexValue;
        }
    }

    public get title(): string {
        return this._title;
    }

    public set title(value: string) {
        if (this._title !== value && value) {
            this._title = value;
            this._parent.changeItemTitle(this._index, this._title);
        }
    }

    public get icon(): string {
        return this._icon;
    }

    public set icon(value: string) {
        if (this._icon !== value && value) {
            this._icon = value;
            this._parent.changeItemIcon(this._index, this._icon);
        }
    }

    public get color(): string {
        return this._color;
    }

    public set color(value: string) {
        if (this._color !== value && value) {
            this._color = value;
            this._parent.changeItemColor(this._index, this._color);
        }
    }

    public get notification(): string {
        return this._notification;
    }

    public set notification(value: string) {
        if (this._notification !== value && value) {
            this._notification = value;
            this._parent.android.setNotification(this._notification, this._index);
        }
    }

    public get parent() {
        return this._parent;
    }

    public set parent(parent: BottomBar) {
        this._parent = parent;
    }
}

let ITEMS = "items"
    , SELECTED_INDEX = "selectedIndex"
    , BOTTOM_NAV = "BottomBar"
    , CHILD_BOTTOM_NAV_ITEM = "BottomBarItem"
    , TITLE_STATE_PROPERTY = "titleState"
    , HIDE = "hide";

let itemsProperty = new Property(ITEMS, BOTTOM_NAV, new PropertyMetadata(undefined))
    , selectedIndexProperty = new Property(SELECTED_INDEX, BOTTOM_NAV, new PropertyMetadata(undefined))
    , titleStateProperty = new Property(TITLE_STATE_PROPERTY, BOTTOM_NAV, new PropertyMetadata(undefined))
    , hideProperty = new Property(HIDE, BOTTOM_NAV, new PropertyMetadata(undefined));

export const enum TITLE_STATE {
    SHOW_WHEN_ACTIVE,
    ALWAYS_SHOW,
    ALWAYS_HIDE
}


(<PropertyMetadata>itemsProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    let bottomnav = <BottomBar>data.object;
    bottomnav._onItemsPropertyChangedSetNativeValue(data);
};

(<PropertyMetadata>selectedIndexProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    let bottomnav = <BottomBar>data.object;
    bottomnav._onSelectedIndexPropertyChangedSetNativeValue(data);
};
(<PropertyMetadata>titleStateProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    let bottomnav = <BottomBar>data.object;
    bottomnav._titleStatePropertyChangedSetNativeValue(data);
};
(<PropertyMetadata>hideProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    let bottomnav = <BottomBar>data.object;
    bottomnav._hidePropertyChangedSetNativeValue(data);
};


export class BottomBar extends View {
    public static itemsProperty = itemsProperty;
    public static selectedIndexProperty = selectedIndexProperty;
    public static tabSelectedEvent = "tabSelected";
    public static titleStateProperty = titleStateProperty;
    public static hideProperty = hideProperty;
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
        this._android.setDefaultBackgroundColor(new Color('#333').android);

        // Use colored navigation with circle reveal effect
        this._android.setColored(true);

    }

    get items(): Array<BottomBarItem> {
        return this._getValue(BottomBar.itemsProperty);
    }

    set items(value: Array<BottomBarItem>) {
        this._setValue(BottomBar.itemsProperty, value);
    }
    public _onItemsPropertyChangedSetNativeValue(data: PropertyChangeData) {
        let items = <Array<BottomBarItem>>data.newValue;
        this.createItems(items);

    }
    public createItems(items: Array<any>) {
        this._android.removeAllItems();
        items.forEach((item, idx, arr) => {
            if (!item.notification) {
                item.notification = ""
            }
            this.items[idx] = new BottomBarItem(item.index, item.title, item.icon, item.color, item.notification, this);
            let icon1 = new BitmapDrawable(fromResource(item.icon).android);
            let item1 = new AHBottomNavigationItem(item.title, icon1, new Color(item.color).android);
            this._android.addItem(item1);
            let notification = item.notification;
            if (notification) {
                this._android.setNotification(notification, idx)
            }
        });
        if (this.selectedIndex != null) {
            this._android.setCurrentItem(this.selectedIndex);
        }
    }

    public changeItemTitle(index: number, title: string) {
        let item = this.items[index];
        if (item.title !== title) {
            item.title = title;
            this.items[index] = item;
        }
        this.createItems(this.items);
    }
    public changeItemColor(index: number, color: string) {
        let item = this.items[index];
        if (item.color !== color) {
            item.color = color;
            this.items[index] = item;
        }
        this.createItems(this.items);
    }

    public changeItemIcon(index: number, icon: string) {
        let item = this.items[index];
        if (item.icon !== icon) {
            item.icon = icon;
            this.items[index] = item;
        }
        this.createItems(this.items);
    }

    get selectedIndex(): number {
        return this._getValue(BottomBar.selectedIndexProperty);
    }

    set selectedIndex(value: number) {
        this._setValue(BottomBar.selectedIndexProperty, value);
    }

    public _onSelectedIndexPropertyChangedSetNativeValue(data: PropertyChangeData) {
        let index = this.selectedIndex;
        if (isUndefined(index)) {
            return;
        }

        if (isDefined(this.items)) {
            if (index < 0 || index >= this.items.length) {
                this.selectedIndex = undefined;
                throw new Error("SelectedIndex should be between [0, items.length)");
            }
        }
        let args = {
            eventName: BottomBar.tabSelectedEvent,
            object: this,
            oldIndex: data.oldValue,
            newIndex: data.newValue
        };
        this.notify(args);
    }

    get titleState(): TITLE_STATE {
        return this._getValue(BottomBar.titleStateProperty);
    }

    set titleState(value: TITLE_STATE) {
        this._setValue(BottomBar.titleStateProperty, value);
    }

    public _titleStatePropertyChangedSetNativeValue(data: PropertyChangeData) {
        let newTitleState = data.newValue;
        let isValid = false;
        if (isDefined(newTitleState)) {
            if (isNumber(newTitleState)) {
                isValid = true;
            }
            if (!isValid) {
                throw new Error("Must be an enum");

            } else {
                this.setTitleStateNative(newTitleState);
            }
        } else {
            throw new Error('Must have titleState');
        }
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
    get hide(): boolean {
        return this._getValue(BottomBar.hideProperty);
    }

    set hide(hideValue: boolean) {
        this._setValue(BottomBar.hideProperty, hideValue);
    }
    public _hidePropertyChangedSetNativeValue(data: PropertyChangeData) {
        let newHideValue = data.newValue;
        let isValid = false;
        if (isDefined(newHideValue)) {
            if (isBoolean(newHideValue)) {
                isValid = true;
            }
            if (!isValid) {
                throw new Error("Must be a boolean");

            } else {
                if (newHideValue) {
                    this._android.hideBottomNavigation();
                } else {
                    this._android.restoreBottomNavigation();
                }
            }
        } else {
            throw new Error('Must have hide');
        }
    }
}