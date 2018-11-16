import { BottomBarBase } from "./bottombar.base";

export class BottomBarItemBase {
    title: string;
    icon: string;

    constructor(title: string, icon: string, bottomBar?: WeakRef<BottomBarBase>) {
        this.title = title;
        this.icon = icon;
    }
}