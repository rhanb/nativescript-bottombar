import { EventData } from "data/observable";
import { Property, PropertyChangeData } from "ui/core/dependency-observable";
import { View } from "ui/core/view";
export interface SelectedIndexChangedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}
export declare const enum TITLE_STATE {
    SHOW_WHEN_ACTIVE = 0,
    ALWAYS_SHOW = 1,
    ALWAYS_HIDE = 2,
}
export interface BottomBarItemInterface {
    title: string;
    icon: string;
    color: string;
    index: number;
    notification?: Notification;
    parent?: WeakRef<any>;
}
export declare class Notification {
    private _textColor;
    private _backgroundColor;
    private _value;
    constructor(textColorValue: string, backgroundColorValue: string, valueValue: string);
    textColor: string;
    backgroundColor: string;
    value: string;
}
export declare class BottomBarCommon extends View {
    static itemsProperty: Property;
    static selectedIndexProperty: Property;
    static tabSelectedEvent: string;
    static titleStateProperty: Property;
    static hideProperty: Property;
    static accentColorProperty: Property;
    static inactiveColorProperty: Property;
    static coloredProperty: Property;
    items: Array<any>;
    _onItemsPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    selectedIndex: number;
    _onSelectedIndexPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    titleState: TITLE_STATE;
    _titleStatePropertyChangedSetNativeValue(data: PropertyChangeData): void;
    hide: boolean;
    _hidePropertyChangedSetNativeValue(data: PropertyChangeData): void;
    setNotification(value: string, index: number): void;
    accentColor: string;
    _accentColorPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    inactiveColor: string;
    _inactiveColorPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    colored: boolean;
    _coloredPropertyChangedSetNativeValue(data: PropertyChangeData): void;
}
