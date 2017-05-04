import { View } from 'ui/core/view';
export declare class TabbarDelegate extends NSObject {
    static ObjCProtocols: any[];
    private _owner;
    static initWithOwner(owner: WeakRef<Tabbar>): TabbarDelegate;
    tabSelected(index: number): void;
}
export declare class TabbarItem extends View {
}
export declare class Tabbar extends View {
    private _ios;
    constructor();
    setBadge(badgeIndex: number, badgeValue: string): void;
    readonly ios: any;
    readonly _nativeView: any;
    onLoaded(): void;
}
