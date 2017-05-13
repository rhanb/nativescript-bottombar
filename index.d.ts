import { Property, PropertyChangeData } from "ui/core/dependency-observable";
import { View } from "ui/core/view";
import { Bindable } from "ui/core/bindable";
import { EventData } from "data/observable";
export interface SelectedIndexChangedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}
export declare class BottomBarItemCommon extends Bindable {
    private _title;
    private _icon;
    private _color;
    private _notification;
    private _index;
    constructor(index: number, title: string, icon: string, color: string, notification?: Notification);
    index: number;
    readonly title: string;
    readonly icon: string;
    readonly color: string;
    readonly notification: Notification;
}
export declare class BottomBarItem extends BottomBarItemCommon {
    private _parent;
    constructor(index: any, title: any, icon: any, color: any, notification?: Notification, parent?: any);
    title: string;
    icon: string;
    color: string;
    notification: Notification;
    parent: WeakRef<BottomBar>;
}
export declare const enum TITLE_STATE {
    SHOW_WHEN_ACTIVE = 0,
    ALWAYS_SHOW = 1,
    ALWAYS_HIDE = 2,
}
export declare class BottomBarCommon extends View {
    static itemsProperty: Property;
    static selectedIndexProperty: Property;
    static tabSelectedEvent: string;
    static titleStateProperty: Property;
    static hideProperty: Property;
    items: Array<any>;
    _onItemsPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    selectedIndex: number;
    _onSelectedIndexPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    titleState: TITLE_STATE;
    _titleStatePropertyChangedSetNativeValue(data: PropertyChangeData): void;
    hide: boolean;
    _hidePropertyChangedSetNativeValue(data: PropertyChangeData): void;
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
export declare class BottomBar extends BottomBarCommon {
    /*
    ios
    */
    private _ios;
    private _delegate;
    constructor();
    createItems(items: Array<any>): void;
    setBadge(badgeIndex: number, badgeValue: string): void;
    readonly ios: any;
    onLoaded(): void;
    /*
    common
    */
    setNotification(value: string, index: number): void;
    readonly _nativeView: any;
    static itemsProperty: Property;
    static selectedIndexProperty: Property;
    static tabSelectedEvent: string;
    static titleStateProperty: Property;
    static hideProperty: Property;
    items: Array<any>;
    _onItemsPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    selectedIndex: number;
    _onSelectedIndexPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    titleState: TITLE_STATE;
    _titleStatePropertyChangedSetNativeValue(data: PropertyChangeData): void;
    hide: boolean;
    _hidePropertyChangedSetNativeValue(data: PropertyChangeData): void;
    /*
    android
    */
    private _android;
    _listener: any;
    readonly android: any;
    readonly currentIndex: number;
    _createUI(): void;
    changeItemTitle(index: number, title: string): void;
    changeItemColor(index: number, color: string): void;
    changeItemIcon(index: number, icon: string): void;
    private setTitleStateNative(newTitleState);
}

