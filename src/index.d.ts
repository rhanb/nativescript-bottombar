import { View } from "tns-core-modules/ui/core/view";
import { Property } from "tns-core-modules/ui/core/properties";
import { EventData } from "tns-core-modules/data/observable";
export declare const enum TITLE_STATE {
    SHOW_WHEN_ACTIVE = 0,
    ALWAYS_SHOW = 1,
    ALWAYS_HIDE = 2,
}
export interface SelectedIndexChangedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}
export interface BottomBarItemInterface {
    index: number;
    title: string;
    icon: string;
    color: string;
    notification?: Notification;
    parent?: WeakRef<any>;
}
export declare abstract class BottomBarBase extends View {
    items: any[];
    private _selectedIndex;
    selectedIndex: number;
    selectItem(index: number): void;
    abstract selectItemNative(index: number): void;
    titleState: TITLE_STATE;
    hide: boolean;
    accentColor: string;
    inactiveColor: string;
    colored: boolean;
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
export declare const itemsProperty: Property<BottomBarBase, any[]>;
export declare const selectedIndexProperty: Property<BottomBarBase, number>;
export declare const titleStateProperty: Property<BottomBarBase, TITLE_STATE>;
export declare const hideProperty: Property<BottomBarBase, boolean>;
export declare const accentColorProperty: Property<BottomBarBase, string>;
export declare const inactiveColorProperty: Property<BottomBarBase, string>;
export declare const coloredProperty: Property<BottomBarBase, boolean>;

export declare class BottomBarItem implements BottomBarItemInterface {
    private _index;
    private _title;
    private _icon;
    private _color;
    private _notification?;
    private _parent?;
    constructor(index: number, title: string, icon: string, color: string, notification?: Notification, parent?: WeakRef<BottomBar>);
    index: number;
    title: string;
    icon: string;
    color: string;
    notification: Notification;
    parent: WeakRef<BottomBar>;
}
export declare class BottomBar extends BottomBarBase {
    private _delegate;
    constructor();
    _index: number;
    readonly android: any;
    readonly ios: any;
    createNativeView(): any;
    changeItemTitle(index: number, title: string): void;
    changeItemIcon(index: number, icon: string): void;
    changeItemColor(index: number, color: string): void;
    createItems(items: Array<any>): void;
    setNotification(value: string, index: number): void;
    setBadge(badgeIndex: number, badgeValue: string): void;
    selectItemNative(index: number): void;
}




