import { BottomBarItemBase, Notification } from "../common";
import { BottomBar } from "./bottombar";
export declare class BottomBarItem extends BottomBarItemBase {
    constructor(index: number, title: string, icon: string, color: string, notification?: Notification, parent?: WeakRef<BottomBar>);
    readonly index: number;
    title: string;
    icon: string;
    color: string;
    notification: Notification;
    parent: WeakRef<BottomBar>;
}
