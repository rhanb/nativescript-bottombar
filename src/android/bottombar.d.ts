import { BottomBarBase } from "../common";
export declare class BottomBar extends BottomBarBase {
    _index: number;
    readonly android: any;
    createNativeView(): any;
    changeItemTitle(index: number, title: string): void;
    changeItemIcon(index: number, icon: string): void;
    changeItemColor(index: number, color: string): void;
    private createItems(items);
    setNotification(value: string, index: number): void;
}
