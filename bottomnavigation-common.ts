import definition = require("nativescript-bottomnavigation");
import {View, AddArrayFromBuilder} from "ui/core/view";
import {PropertyMetadataSettings, Property, PropertyChangeData} from "ui/core/dependency-observable";
import {Bindable} from "ui/core/bindable";
import {isAndroid} from "platform";
import {PropertyMetadata} from "ui/core/proxy";
import types = require("utils/types");
import trace = require("trace");
import color = require("color");

// on Android we explicitly set propertySettings to None because android will invalidate its layout (skip unnecessary native call).
let AffectsLayout = isAndroid ? PropertyMetadataSettings.None : PropertyMetadataSettings.AffectsLayout;

export var traceCategory = "BottomNavigation";

export module knownCollections {
    export var items = "items";
}

var ITEMS = "items";
var SELECTED_INDEX = "selectedIndex"
var BOTTOM_NAV = "BottomNavigation"
var CHILD_BOTTOM_NAV_ITEM = "BottomNavigationItem"

export class BottomNavigationItem extends Bindable implements definition.BottomNavigationItem {
    private _title: string = "";
    private _icon: string = "";
    private _color: string = "";
    public _parent: BottomNavigation;

    get title(): string {
        return this._title;
    }
    set title(value: string) {
        if (this._title !== value) {
            this._title = value;
            this._update();
        }
    }

    get icon(): string {
        return this._icon;
    }
    set icon(value: string) {
        if (this._icon !== value) {
            this._icon = value;
            this._update();
        }
    }

    get color(): string {
        return this._color;
    }
    set color(value: string) {
        if (this._color !== value) {
            this._color = value;
            this._update();
        }
    }

    public _update() {
        //
    }
}

var itemsProperty = new Property(ITEMS, BOTTOM_NAV, new PropertyMetadata(undefined));
var selectedIndexProperty = new Property(SELECTED_INDEX, BOTTOM_NAV, new PropertyMetadata(undefined));


(<PropertyMetadata>itemsProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    var bottomnav = <BottomNavigation>data.object;
    bottomnav._onItemsPropertyChangedSetNativeValue(data);
};

(<PropertyMetadata>selectedIndexProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    var bottomnav = <BottomNavigation>data.object;
    bottomnav._onSelectedIndexPropertyChangedSetNativeValue(data);
};

export class BottomNavigation extends View implements definition.BottomNavigation {
    public static itemsProperty = itemsProperty;
    public static selectedIndexProperty = selectedIndexProperty;
    public static tabSelectedEvent = "tabSelected";

    public _addArrayFromBuilder(name: string, value: Array<any>) {
        // console.log('BottomNavigation._addArrayFromBuilder: ' + name)
        if (name === ITEMS) {
            this._setValue(BottomNavigation.itemsProperty, value);
        }
    }

    public _onBindingContextChanged(oldValue: any, newValue: any) {
        super._onBindingContextChanged(oldValue, newValue);
        if (this.items && this.items.length > 0) {
            var i = 0;
            var length = this.items.length;
            for (; i < length; i++) {
                this.items[i].bindingContext = newValue;
            }
        }
    }

    public _addChildFromBuilder(name: string, value: any): void {
        // console.log('BottomNavigation._addChildFromBuilder: ' + name)
        if(name === CHILD_BOTTOM_NAV_ITEM) {
            if (!this.items) {
                this.items = new Array<BottomNavigationItem>();
            }
            // console.log(JSON.stringify(<BottomNavigationItem>value))
            this.items.push(<BottomNavigationItem>value);
            // console.log(JSON.stringify(this.items))
            this.insertTab(<BottomNavigationItem>value);
            
        }
    }

    public insertTab(tabItem: BottomNavigationItem, index?: number): void {
        //
    }

    get items(): Array<definition.BottomNavigationItem> {
        return this._getValue(BottomNavigation.itemsProperty);
    }
    set items(value: Array<definition.BottomNavigationItem>) {
        this._setValue(BottomNavigation.itemsProperty, value);
    }

    public _onItemsPropertyChangedSetNativeValue(data: PropertyChangeData) {
        // if (trace.enabled) {
        //     trace.write("TabView.__onItemsPropertyChangedSetNativeValue(" + data.oldValue + " -> " + data.newValue + ");", traceCategory);
        // }
        // if (data.oldValue) {
        //     this._removeTabs(data.oldValue);
        // }

        // if (data.newValue) {
        //     this._addTabs(data.newValue);
        // }

        // this._updateSelectedIndexOnItemsPropertyChanged(data.newValue);
    }

    // public _updateSelectedIndexOnItemsPropertyChanged(newItems) {
    //     if (trace.enabled) {
    //         trace.write("TabView._updateSelectedIndexOnItemsPropertyChanged(" + newItems + ");", traceCategory);
    //     }
    //     var newItemsCount = 0;
    //     if (newItems) {
    //         newItemsCount = newItems.length;
    //     }

    //     if (newItemsCount === 0) {
    //         this.selectedIndex = undefined;
    //     }
    //     else if (types.isUndefined(this.selectedIndex) || this.selectedIndex >= newItemsCount) {
    //         this.selectedIndex = 0;
    //     }
    // }

    get selectedIndex(): number {
        return this._getValue(BottomNavigation.selectedIndexProperty);
    }
    set selectedIndex(value: number) {
        this._setValue(BottomNavigation.selectedIndexProperty, value);
    }

    public _onSelectedIndexPropertyChangedSetNativeValue(data: PropertyChangeData) {
        var index = this.selectedIndex;
        if (types.isUndefined(index)) {
            return;
        }

        if (types.isDefined(this.items)) {
            if (index < 0 || index >= this.items.length) {
                this.selectedIndex = undefined;
                throw new Error("SelectedIndex should be between [0, items.length)");
            }
        }
    }

}