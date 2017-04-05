import common = require("./bottombar.common");
import trace = require("trace");
import types = require("utils/types");
import { PropertyMetadata } from "ui/core/proxy";
import { PropertyMetadataSettings, Property, PropertyChangeData } from "ui/core/dependency-observable";
import { View } from "ui/core/view";
import { Color } from "color";
import * as imageSource from "image-source";
import { SelectedIndexChangedEventData } from "./bottombar.common";


declare var com, android: any;

global.moduleMerge(common, exports);

let BitmapDrawable = android.graphics.drawable.BitmapDrawable;
let AHBottomNavigation = com.aurelhubert.ahbottomnavigation.AHBottomNavigation; /// https://github.com/aurelhubert/ahbottomnavigation/blob/master/ahbottomnavigation/src/main/java/com/aurelhubert/ahbottomnavigation/AHBottomNavigation.java#L1
let AHBottomNavigationItem = com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem; /// https://github.com/aurelhubert/ahbottomnavigation/blob/master/ahbottomnavigation/src/main/java/com/aurelhubert/ahbottomnavigation/AHBottomNavigationItem.java#L86
let AHNotification = com.aurelhubert.ahbottomnavigation.notification.AHNotification;

export class BottomBarItem extends common.BottomBarItem {
    private _title: string = "";
    private _icon: string = "";
    private _color: string = "";
    private _notification: string = "";
    private _index: number;
    private _parent: BottomBar;

    constructor(index, title, icon, color, notification?, parent?) {
        super();
        this._index = index;
        this._title = title;
        this._icon = icon;
        this._color = color;
        console.log('constructor - notification');
        console.dir(typeof notification);
        console.log('constructor - parent');
        console.dir(typeof parent);
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
        }
    }

    public get icon(): string {
        return this._icon;
    }

    public set icon(value: string) {
        if (this._icon !== value && value) {
            this._icon = value;
        }
    }

    public get color(): string {
        return this._color;
    }

    public set color(value: string) {
        if (this._color !== value && value) {
            this._color = value;
        }
    }

    public get notification(): any {
        return this._notification;
    }

    public set notification(value: any) {
        if (this._notification !== value && value) {
            this._notification = value;
            this._parent.android.setNotification(this._notification, this._index);
        }
    }

    public get parent () {
        return this._parent;
    }

    public set parent(parent: BottomBar) {
        this._parent = parent;
    }
}
export class BottomBar extends common.BottomBar {
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

        var that = new WeakRef(this);

        this._listener = new AHBottomNavigation.OnTabSelectedListener({
            onTabSelected: function (position: number, wasSelected: boolean): boolean {
                var bar = that.get();
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
        if (types.isDefined(owner.titleState)) {
            this.setTitleStateNative(owner.titleState);
        } else {
            this._android.setTitleState(AHBottomNavigation.TitleState.ALWAYS_SHOW);
        }

        // Set background color
        this._android.setDefaultBackgroundColor(new Color('#333').android);

        // Use colored navigation with circle reveal effect
        this._android.setColored(true);

    }

    public _onItemsPropertyChangedSetNativeValue(data: PropertyChangeData) {
        console.log('_onItemsPropertyChangedSetNativeValue');
        this._android.removeAllItems();
        let items = <Array<BottomBarItem>>data.newValue;
        items.forEach((item, idx, arr) => {
            if (!item.notification) {
                item.notification = ""
            }
            this.items[idx] = new BottomBarItem(item.index, item.title, item.icon, item.color, item.notification, this);
            let icon1 = new BitmapDrawable(imageSource.fromResource(item.icon).android);
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

    public _onSelectedIndexPropertyChangedSetNativeValue(data: PropertyChangeData) {
        super._onSelectedIndexPropertyChangedSetNativeValue(data);
        var index = data.newValue;
        var args = {
            eventName: BottomBar.tabSelectedEvent,
            object: this,
            oldIndex: data.oldValue,
            newIndex: data.newValue
        };
        this.notify(args);
    }

    public _titleStatePropertyChangedSetNativeValue(data: PropertyChangeData) {
        let newTitleState = data.newValue;
        let isValid = false;
        if (types.isDefined(newTitleState)) {
            if (types.isNumber(newTitleState)) {
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

    public _hidePropertyChangedSetNativeValue(data: PropertyChangeData) {
        let newHideValue = data.newValue;
        let isValid = false;
        if (types.isDefined(newHideValue)) {
            if (types.isBoolean(newHideValue)) {
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

    private setTitleStateNative(newTitleState: common.TITLE_STATE) {
        switch (newTitleState) {
            case common.TITLE_STATE.ALWAYS_SHOW:
                this._android.setTitleState(AHBottomNavigation.TitleState.ALWAYS_SHOW);
                break;
            case common.TITLE_STATE.SHOW_WHEN_ACTIVE:
                this._android.setTitleState(AHBottomNavigation.TitleState.SHOW_WHEN_ACTIVE);
                break;
            case common.TITLE_STATE.ALWAYS_HIDE:
                this._android.setTitleState(AHBottomNavigation.TitleState.ALWAYS_HIDE);
                break;
        }
    }
}