import { BottomBarBase, BottomBarItemInterface } from "./bottombar.common";
export declare class BottomBar extends BottomBarBase {
    _index: number;
    readonly android: any;
    createNativeView(): any;
    changeItemTitle(index: number, title: string): void;
    changeItemIcon(index: number, icon: string): void;
    changeItemColor(index: number, color: string): void;
    private createItems(items);
}
export declare class BottomBarItem implements BottomBarItemInterface {
    private _title;
    private _icon;
    private _color;
    private _index;
    private _notification?;
    private _parent?;
    constructor(index: number, title: string, icon: string, color: string, notification?: string, parent?: WeakRef<any>);
    title: string;
    icon: string;
    color: string;
    index: number;
    notification: string;
    parent: WeakRef<any>;
}
