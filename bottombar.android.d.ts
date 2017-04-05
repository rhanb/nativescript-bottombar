import { Property, PropertyChangeData } from "ui/core/dependency-observable";
import { View } from "ui/core/view";
import { Bindable } from "ui/core/bindable";
import { EventData } from "data/observable";
export interface SelectedIndexChangedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}
export declare class BottomBarItem extends Bindable {
    private _title;
    private _icon;
    private _color;
    private _notification;
    private _index;
    private _parent;
    constructor(index: any, title: any, icon: any, color: any, notification?: any, parent?: any);
    index: number;
    title: string;
    icon: string;
    color: string;
    notification: string;
    parent: BottomBar;
}
export declare const enum TITLE_STATE {
    SHOW_WHEN_ACTIVE = 0,
    ALWAYS_SHOW = 1,
    ALWAYS_HIDE = 2,
}
export declare class BottomBar extends View {
    static itemsProperty: Property;
    static selectedIndexProperty: Property;
    static tabSelectedEvent: string;
    static titleStateProperty: Property;
    static hideProperty: Property;
    private _android;
    _listener: any;
    readonly android: any;
    readonly _nativeView: any;
    readonly currentIndex: number;
    _createUI(): void;
    _addArrayFromBuilder(name: string, value: Array<any>): void;
    _onBindingContextChanged(oldValue: any, newValue: any): void;
    _addChildFromBuilder(name: string, value: any): void;
    insertTab(tabItem: BottomBarItem, index?: number): void;
    items: Array<BottomBarItem>;
    _onItemsPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    createItems(items: Array<any>): void;
    changeItemTitle(index: number, title: string): void;
    changeItemColor(index: number, color: string): void;
    changeItemIcon(index: number, icon: string): void;
    selectedIndex: number;
    _onSelectedIndexPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    titleState: TITLE_STATE;
    _titleStatePropertyChangedSetNativeValue(data: PropertyChangeData): void;
    private setTitleStateNative(newTitleState);
    hide: boolean;
    _hidePropertyChangedSetNativeValue(data: PropertyChangeData): void;
}
