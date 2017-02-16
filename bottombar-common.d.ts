import definition = require("nativescript-bottombar");
import { View } from "ui/core/view";
import { Property, PropertyChangeData } from "ui/core/dependency-observable";
import { Bindable } from "ui/core/bindable";
export declare var traceCategory: string;
export declare module knownCollections {
    var items: string;
}
export declare class BottomBarItem extends Bindable implements definition.BottomBarItem {
    private _title;
    private _icon;
    private _color;
    _parent: BottomBar;
    title: string;
    icon: string;
    color: string;
    _update(): void;
}
export declare const enum TITLE_STATE {
    SHOW_WHEN_ACTIVE = 0,
    ALWAYS_SHOW = 1,
    ALWAYS_HIDE = 2,
}
export declare class BottomBar extends View implements definition.BottomBar {
    static itemsProperty: Property;
    static selectedIndexProperty: Property;
    static tabSelectedEvent: string;
    static titleStateProperty: Property;
    _addArrayFromBuilder(name: string, value: Array<any>): void;
    _onBindingContextChanged(oldValue: any, newValue: any): void;
    _addChildFromBuilder(name: string, value: any): void;
    insertTab(tabItem: BottomBarItem, index?: number): void;
    items: Array<definition.BottomBarItem>;
    _onItemsPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    selectedIndex: number;
    _onSelectedIndexPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    titleState: TITLE_STATE;
    _titleStatePropertyChangedSetNativeValue(data: PropertyChangeData): void;
}
