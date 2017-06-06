import { PropertyChangeData } from "ui/core/dependency-observable";
import { BottomBarCommon, BottomBarItemInterface, Notification } from "../common";
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
export declare class BottomBar extends BottomBarCommon {
    private _android;
    _listener: any;
    readonly android: any;
    readonly _nativeView: any;
    readonly currentIndex: number;
    _createUI(): void;
    _onItemsPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    createItems(items: Array<any>): void;
    changeItemTitle(index: number, title: string): void;
    changeItemColor(index: number, color: string): void;
    changeItemIcon(index: number, icon: string): void;
    _titleStatePropertyChangedSetNativeValue(data: PropertyChangeData): void;
    private setTitleStateNative(newTitleState);
    _hidePropertyChangedSetNativeValue(data: PropertyChangeData): void;
    setNotification(value: string, index: number): void;
    _accentColorPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    _inactiveColorPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    _coloredPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    selectItemNative(index: number): void;
}
