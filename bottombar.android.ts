import common = require("./bottombar-common");
import definition = require("nativescript-bottombar");
import trace = require("trace");
import types = require("utils/types");
import { PropertyMetadata } from "ui/core/proxy";
import { PropertyMetadataSettings, Property, PropertyChangeData } from "ui/core/dependency-observable";
import { View } from "ui/core/view";
import { Color } from "color";
import * as imageSource from "image-source";

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
                // console.log(position + ' ' + wasSelected)
                var bar = that.get();
                if (bar) {
                    bar.selectedIndex = position;
                }
                return true;
            }
        });

        this._android.setOnTabSelectedListener(null);
        this._android.setOnTabSelectedListener(this._listener);

        //always show title
        this._android.setTitleState(AHBottomNavigation.TitleState.ALWAYS_SHOW);

        // Set background color
        this._android.setDefaultBackgroundColor(new Color('#333').android);

        // Use colored navigation with circle reveal effect
        this._android.setColored(true);

    }

    public _onItemsPropertyChangedSetNativeValue(data: PropertyChangeData) {

        // console.log("BottomNavigation.__onItemsPropertyChangedSetNativeValue(" + data.oldValue + " -> " + data.newValue + ");");

        // console.log(JSON.stringify(data.newValue))

        // if (data.oldValue) {
        //     this._removeTabs(data.oldValue);
        // }

        // if (data.newValue) {
        //     this._addTabs(data.newValue);
        // }

        this._android.removeAllItems();


        let items = <Array<definition.BottomBarItem>>data.newValue

        items.forEach((item, idx, arr) => {
            console.log(item.title, idx)

            let icon1 = new BitmapDrawable(imageSource.fromResource(item.icon).android);
            let item1 = new AHBottomNavigationItem(item.title, icon1, new Color(item.color).android);
            this._android.addItem(item1);
        });

        if (this.selectedIndex != null)
            this._android.setCurrentItem(this.selectedIndex)

        // this._updateSelectedIndexOnItemsPropertyChanged(data.newValue);
    }

    public _onSelectedIndexPropertyChangedSetNativeValue(data: PropertyChangeData) {
        // console.log("BottomNavigation._onSelectedIndexPropertyChangedSetNativeValue(" + data.oldValue + " ---> " + data.newValue + ");");

        super._onSelectedIndexPropertyChangedSetNativeValue(data);

        var index = data.newValue;
        // if (!types.isNullOrUndefined(index)) {
        //     // Select the respective page in the ViewPager
        //     var viewPagerSelectedIndex = this._viewPager.getCurrentItem();
        //     if (viewPagerSelectedIndex !== index) {
        //         if (trace.enabled) {
        //             trace.write("TabView this._viewPager.setCurrentItem(" + index + ", true);", common.traceCategory);
        //         }
        //         this._viewPager.setCurrentItem(index, true);
        //     }
        // }

        var args = { eventName: BottomBar.tabSelectedEvent, object: this, oldIndex: data.oldValue, newIndex: data.newValue };
        this.notify(args);
    }

}