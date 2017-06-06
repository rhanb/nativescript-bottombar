import { PropertyChangeData } from "ui/core/dependency-observable";
import { BottomBarItemInterface, BottomBarCommon, Notification } from "../common";
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
export declare class BottomBarDelegate extends NSObject {
    static ObjCProtocols: any[];
    private _owner;
    static initWithOwner(owner: WeakRef<BottomBar>): BottomBarDelegate;
    tabSelected(index: number): void;
}
export declare class BottomBar extends BottomBarCommon {
    private _ios;
    private _delegate;
    constructor();
    _onItemsPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    createItems(items: Array<BottomBarItem>): void;
    _hidePropertyChangedSetNativeValue(data: PropertyChangeData): void;
    _titleStatePropertyChangedSetNativeValue(data: PropertyChangeData): void;
    _accentColorPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    _inactiveColorPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    _coloredPropertyChangedSetNativeValue(data: PropertyChangeData): void;
    setNotification(value: string, index: number): void;
    setBadge(badgeIndex: number, badgeValue: string): void;
    selectItemNative(index: number): void;
    readonly ios: any;
    readonly _nativeView: any;
    onLoaded(): void;
}
