import common = require("./bottombar-common");
import definition = require("nativescript-bottombar");
import trace = require("trace");
import types = require("utils/types");
import {PropertyMetadata} from "ui/core/proxy";
import {PropertyMetadataSettings, Property, PropertyChangeData} from "ui/core/dependency-observable";
import {View} from "ui/core/view";
import {Color} from "color";
import * as imageSource from "image-source";
import {SelectedIndexChangedEventData} from "nativescript-bottombar";


declare var com, android: any;

global.moduleMerge(common, exports);

let BitmapDrawable = android.graphics.drawable.BitmapDrawable;
let AHBottomNavigation = com.aurelhubert.ahbottomnavigation.AHBottomNavigation; /// https://github.com/aurelhubert/ahbottomnavigation/blob/master/ahbottomnavigation/src/main/java/com/aurelhubert/ahbottomnavigation/AHBottomNavigation.java#L1
let AHBottomNavigationItem = com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem; /// https://github.com/aurelhubert/ahbottomnavigation/blob/master/ahbottomnavigation/src/main/java/com/aurelhubert/ahbottomnavigation/AHBottomNavigationItem.java#L86

export class BottomBarItem extends common.BottomBarItem {
    public _update() {
        if (this._parent && this._parent.android) {

        }
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
                if (position !== oldIndex) {
                    bar.notify(<definition.SelectedIndexChangedEventData>{
                        eventName: common.BottomBar.tabSelectedEvent,
                        object: bar,
                        oldIndex: oldIndex,
                        newIndex: position
                    })
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
        this._android.removeAllItems();
        let items = <Array<definition.BottomBarItem>>data.newValue;
        items.forEach((item, idx, arr) => {
            let icon1 = new BitmapDrawable(imageSource.fromResource(item.icon).android);
            let item1 = new AHBottomNavigationItem(item.title, icon1, new Color(item.color).android);
            this._android.addItem(item1);
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