import { BottomBar } from "./bottombar";
import { Notification, BottomBarItemBase } from '../common';
export declare class BottomBarItem extends BottomBarItemBase {
    constructor(index: number, title: string, icon: string, color: string, notification?: Notification, parent?: WeakRef<BottomBar>);
    index: number;
    title: string;
    icon: string;
    color: string;
    notification: Notification;
    parent: WeakRef<BottomBar>;
}
