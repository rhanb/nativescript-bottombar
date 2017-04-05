import { View } from "ui/core/view";
import { Property, PropertyChangeData } from "ui/core/dependency-observable";
import { Bindable } from "ui/core/bindable";
import { EventData } from "data/observable";
export declare var traceCategory: string;
export declare module knownCollections {
    var items: string;
}
export interface SelectedIndexChangedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}
export declare class BottomBarItem extends Bindable {
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
    _addArrayFromBuilder(name: string, value: Array<any>): void;
    _onBindingContextChanged(oldValue: any, newValue: any): void;
    _addChildFromBuilder(name: string, value: any): void;
    insertTab(tabItem: BottomBarItem, index?: number): void;
    items: Array<BottomBarItem>;
    _onItemsPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    selectedIndex: number;
    _onSelectedIndexPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    titleState: TITLE_STATE;
    hide: boolean;
    _titleStatePropertyChangedSetNativeValue(data: PropertyChangeData): void;
    _hidePropertyChangedSetNativeValue(data: PropertyChangeData): void;
}
