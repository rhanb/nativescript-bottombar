import { View, AddArrayFromBuilder } from "ui/core/view";
import { PropertyMetadataSettings, Property, PropertyChangeData } from "ui/core/dependency-observable";
import { Bindable } from "ui/core/bindable";
import { isAndroid } from "platform";
import { PropertyMetadata } from "ui/core/proxy";
import types = require("utils/types");
import trace = require("trace");
import color = require("color");
import { EventData } from "data/observable";

// on Android we explicitly set propertySettings to None because android will invalidate its layout (skip unnecessary native call).
let AffectsLayout = isAndroid ? PropertyMetadataSettings.None : PropertyMetadataSettings.AffectsLayout;

export var traceCategory = "BottomBar";

export module knownCollections {
    export var items = "items";
}

var ITEMS = "items";
var SELECTED_INDEX = "selectedIndex";
var BOTTOM_NAV = "BottomBar";
var CHILD_BOTTOM_NAV_ITEM = "BottomBarItem";
var TITLE_STATE_PROPERTY = "titleState";
var NOTIFICATION = "notification";
var HIDE = "hide";

export interface SelectedIndexChangedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}
var notificationProperty = new Property(NOTIFICATION, CHILD_BOTTOM_NAV_ITEM, new PropertyMetadata(undefined));

(<PropertyMetadata>notificationProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    var bottomnavItem = <BottomBarItem>data.object;
    bottomnavItem._notificationPropertyChangedSetNativeValue(data);
};
export class BottomBarItem extends Bindable {
    private _title: string = "";
    private _icon: string = "";
    private _color: string = "";
    public static notificationProperty = notificationProperty;
    //private _index: number;
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

    /*get index () {
        return this._index;
    }

    set index (newIndex: number) {
        this._index = newIndex;
    }*/

    get notification(): any {
        return this._getValue(BottomBarItem.notificationProperty);
    }

    set notification(value: any) {
        this._setValue(BottomBarItem.notificationProperty, value);
    }

    public _notificationPropertyChangedSetNativeValue(data: PropertyChangeData) { }

    public _update() {
        //
    }
}

var itemsProperty = new Property(ITEMS, BOTTOM_NAV, new PropertyMetadata(undefined));
var selectedIndexProperty = new Property(SELECTED_INDEX, BOTTOM_NAV, new PropertyMetadata(undefined));
var titleStateProperty = new Property(TITLE_STATE_PROPERTY, BOTTOM_NAV, new PropertyMetadata(undefined));
var hideProperty = new Property(HIDE, BOTTOM_NAV, new PropertyMetadata(undefined));


(<PropertyMetadata>itemsProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    var bottomnav = <BottomBar>data.object;
    bottomnav._onItemsPropertyChangedSetNativeValue(data);
};

(<PropertyMetadata>selectedIndexProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    var bottomnav = <BottomBar>data.object;
    bottomnav._onSelectedIndexPropertyChangedSetNativeValue(data);
};
(<PropertyMetadata>titleStateProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    var bottomnav = <BottomBar>data.object;
    bottomnav._titleStatePropertyChangedSetNativeValue(data);
};
(<PropertyMetadata>hideProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    var bottomnav = <BottomBar>data.object;
    bottomnav._hidePropertyChangedSetNativeValue(data);
};
export const enum TITLE_STATE {
    SHOW_WHEN_ACTIVE,
    ALWAYS_SHOW,
    ALWAYS_HIDE
}
export class BottomBar extends View {
    public static itemsProperty = itemsProperty;
    public static selectedIndexProperty = selectedIndexProperty;
    public static tabSelectedEvent = "tabSelected";
    public static titleStateProperty = titleStateProperty;
    public static hideProperty = hideProperty;


    public _addArrayFromBuilder(name: string, value: Array<any>) {
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
        if (name === CHILD_BOTTOM_NAV_ITEM) {
            if (!this.items) {
                this.items = new Array<BottomBarItem>();
            }
            this.items.push(<BottomBarItem>value);
            this.insertTab(<BottomBarItem>value);

        }
    }

    public insertTab(tabItem: BottomBarItem, index?: number): void {
        //
    }

    get items(): Array<BottomBarItem> {
        return this._getValue(BottomBar.itemsProperty);
    }

    set items(value: Array<BottomBarItem>) {
        this._setValue(BottomBar.itemsProperty, value);
    }

    public _onItemsPropertyChangedSetNativeValue(data: PropertyChangeData) {
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

    get titleState(): TITLE_STATE {
        return this._getValue(BottomBar.titleStateProperty);
    }

    set titleState(value: TITLE_STATE) {
        this._setValue(BottomBar.titleStateProperty, value);
    }

   get hide(): boolean {
        return this._getValue(BottomBar.hideProperty);
    }

    set hide(hideValue: boolean) {
        this._setValue(BottomBar.hideProperty, hideValue);
    }

    public _titleStatePropertyChangedSetNativeValue(data: PropertyChangeData) { }

    public _hidePropertyChangedSetNativeValue(data: PropertyChangeData) { }
}