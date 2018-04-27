import { BottomBar } from "./bottombar";
import { Notification, BottomBarItemBase } from '../common';

export class BottomBarItem extends BottomBarItemBase {

    constructor(index: number, title: string, icon: string, color: string, notification?: Notification, parent?: WeakRef<BottomBar>) {
        super(index, title, icon, color, notification, parent);
    }

    public set index(indexValue: number) {
        super.setIndex(indexValue);
    }

    public get index(): number {
        return super.getIndex();
    }

    public get title(): string {
        return super.getTitle();
    }
    public set title(value: string) {
        super.setTitle(value);
    }

    public set icon(value: string) {
        super.setIcon(value);
    }

    public get icon(): string {
        return super.getIcon();
    }


    public set color(value: string) {
        super.setColor(value);
    }

    public get color():string {
        return super.getColor();
    }

    public set notification(value: Notification) {
        if (super.setNotification(value)) {
            this.parent.get().ios.changeBadgeItem(this.index, this.notification.value);
        }
    }

    public get notification():Notification {
        return super.getNotification();
    }

    public set parent(parent: WeakRef<BottomBar>) {
        super.setParent(parent);
    }
}