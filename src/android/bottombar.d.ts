import { BottomBarBase } from "../common";
export declare class BottomBar extends BottomBarBase {
    readonly android: any;
    createNativeView(): any;
    changeItemTitle(index: number, title: string): void;
    changeItemIcon(index: number, icon: string): void;
    changeItemColor(index: number, color: string): void;
    selectItemNative(index: number): void;
    private createItems(items);
    setNotification(value: string, index: number): void;
}
