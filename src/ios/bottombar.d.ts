import { BottomBarBase } from "../common";
import { BottomBarItem } from "./bottombar-item";
export declare class BottomBarDelegate extends NSObject {
    static ObjCProtocols: any[];
    private _owner;
    static initWithOwner(owner: WeakRef<BottomBar>): BottomBarDelegate;
    tabSelected(index: number): void;
}
export declare class BottomBar extends BottomBarBase {
    private _delegate;
    constructor();
    readonly ios: any;
    onLoaded(): void;
    onUnloaded(): void;
    disposeNativeView(): void;
    createItems(items: Array<BottomBarItem>): void;
    setNotification(value: string, index: number): void;
    setBadge(badgeIndex: number, badgeValue: string): void;
    tabSelected(index: number): void;
    selectItemNative(index: number): void;
    createCustomView(): void;
}
