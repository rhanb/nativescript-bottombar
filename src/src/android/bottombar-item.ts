import { BottomBarItemBase, Notification } from "../common";
import { BottomBar } from "./bottombar";
import { Color } from "tns-core-modules/color/color";

declare const com;
let AHNotification = com.aurelhubert.ahbottomnavigation.notification.AHNotification;

export class BottomBarItem extends BottomBarItemBase {

    constructor(index: number, title: string, icon: string, color: string, notification?: Notification, parent?: WeakRef<BottomBar>) {
        super(index, title, icon, color, notification, parent);
    }

    public get index ():number {
        return super.getIndex();
    }

    public set title(value: string) {
        let currentTitle = super.getTitle();
        if (super.setTitle(value)) {
            this.parent.get().changeItemTitle(this.index, this.title);
        }
    }

    public get title(): string {
        return super.getTitle();
    }

    public set icon(value: string) {
        if (super.setIcon(value)) {
            this.parent.get().changeItemIcon(this.index, this.icon);
        }
    }

    public get icon (): string {
        return super.getIcon();
    }

    public set color(value: string) {
        if (super.setColor(value)) {
            this.parent.get().changeItemColor(this.index, this.color);
        }
    }

    public get color(): string {
        return super.getColor();
    }

    public set notification(value: Notification) {
        if (super.setNotification(value)) {
            if (this.notification.value !== "") {
                let newNotification = new AHNotification.Builder()
                    .setText(this.notification.value)
                    .setBackgroundColor(new Color(this.notification.backgroundColor).android)
                    .setTextColor(new Color(this.notification.textColor).android)
                    .build();
                this.parent.get().android.setNotification(newNotification, this.index);
            } else {
                this.parent.get().android.setNotification("", this.index);
            }
        }
    }

    public get notification(): Notification {
        return super.getNotification();
    }

    public set parent(parent: WeakRef<BottomBar>) {
        super.setParent(parent);
    }
}