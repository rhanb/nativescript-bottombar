import { BottomBarBase } from "./common";
import { Notification } from "./notification";

export class BottomBarItemBase {
    private _index: number;
    private _title: string;
    private _icon: string;
    private _color: string;
    private _notification?: Notification;
    private _parent?: WeakRef<BottomBarBase>;
    constructor(index: number, title: string, icon: string, color: string, notification?: Notification, parent?: WeakRef<BottomBarBase>) {
        this._index = index;
        this._title = title;
        this._icon = icon;
        this._color = color;
        if (notification) {
            this._notification = notification;
        }
        if (parent) {
            this._parent = parent;
        }
    }

    protected getIndex(): number {
        return this._index;
    }

    protected setIndex(newIndex: number): boolean {
        if (this._index !== newIndex) {
            this._index = newIndex;
            return true;
        }
    }

    protected setTitle(newTitle: string): boolean {
        if (this._title !== newTitle) {
            this._title = newTitle;
            return true;
        }
    }

    protected getTitle(): string {
        return this._title;
    }

    protected getIcon(): string {
        return this._icon;
    }

    protected setIcon(newIcon: string): boolean {
        if (this._icon !== newIcon) {
            this._icon = newIcon;
            return true;
        }        
    }

    protected getColor(): string {
        return this._color;
    }

    protected setColor(newColor: string): boolean {
        if (this._color !== newColor) {
            this._color = newColor;
            return true;
        }        
    }

    protected getNotification(): Notification {
        return this._notification;
    }

    protected setNotification(newNotification: Notification): boolean {
        if (this._notification !== newNotification) {
            this._notification = newNotification;
            return true;
        }        
    }

    protected getParent(): WeakRef<BottomBarBase> {
        return this._parent;
    }

    protected setParent(newParent: WeakRef<BottomBarBase>): boolean {
        if (this._parent !== newParent) {
           this._parent = newParent;
            return true;        
        }
    }
}