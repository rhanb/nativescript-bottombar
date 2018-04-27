import { BottomBarBase } from "./common";
import { Notification } from "./notification";
export declare class BottomBarItemBase {
    private _index;
    private _title;
    private _icon;
    private _color;
    private _notification?;
    private _parent?;
    constructor(index: number, title: string, icon: string, color: string, notification?: Notification, parent?: WeakRef<BottomBarBase>);
    protected getIndex(): number;
    protected setIndex(newIndex: number): boolean;
    protected setTitle(newTitle: string): boolean;
    protected getTitle(): string;
    protected getIcon(): string;
    protected setIcon(newIcon: string): boolean;
    protected getColor(): string;
    protected setColor(newColor: string): boolean;
    protected getNotification(): Notification;
    protected setNotification(newNotification: Notification): boolean;
    protected getParent(): WeakRef<BottomBarBase>;
    protected setParent(newParent: WeakRef<BottomBarBase>): boolean;
}
