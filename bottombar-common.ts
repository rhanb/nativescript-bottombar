import definition = require("nativescript-bottombar");
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

export var traceCategory = "BottomBar";

export module knownCollections {
    export var items = "items";
}

var ITEMS = "items";
var SELECTED_INDEX = "selectedIndex"
var BOTTOM_NAV = "BottomBar"
var CHILD_BOTTOM_NAV_ITEM = "BottomBarItem"

export class BottomBarItem extends Bindable implements definition.BottomBarItem {
    private _title: string = "";
    private _icon: string = "";
    private _color: string = "";
    public _parent: BottomBar;

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
    var bottomnav = <BottomBar>data.object;
    bottomnav._onItemsPropertyChangedSetNativeValue(data);
};

(<PropertyMetadata>selectedIndexProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    var bottomnav = <BottomBar>data.object;
    bottomnav._onSelectedIndexPropertyChangedSetNativeValue(data);
};

export class BottomBar extends View implements definition.BottomBar {
    public static itemsProperty = itemsProperty;
    public static selectedIndexProperty = selectedIndexProperty;
    public static tabSelectedEvent = "tabSelected";

    public _addArrayFromBuilder(name: string, value: Array<any>) {
         console.log('BottomBar._addArrayFromBuilder: ' + name)
        if (name === ITEMS) {
            this._setValue(BottomBar.itemsProperty, value);
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
         console.log('BottomBar._addChildFromBuilder: ' + name)
        if(name === CHILD_BOTTOM_NAV_ITEM) {
            if (!this.items) {
                this.items = new Array<BottomBarItem>();
            }
             console.log(JSON.stringify(<BottomBarItem>value))
            this.items.push(<BottomBarItem>value);
             console.log(JSON.stringify(this.items))
            this.insertTab(<BottomBarItem>value);
            
        }
    }

    public insertTab(tabItem: BottomBarItem, index?: number): void {
        //
    }

    get items(): Array<definition.BottomBarItem> {
        return this._getValue(BottomBar.itemsProperty);
    }
    set items(value: Array<definition.BottomBarItem>) {
        this._setValue(BottomBar.itemsProperty, value);
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

    get selectedIndex(): number {
        return this._getValue(BottomBar.selectedIndexProperty);
    }
    set selectedIndex(value: number) {
        this._setValue(BottomBar.selectedIndexProperty, value);
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