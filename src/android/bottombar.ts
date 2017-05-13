import {
    BottomBarBase,
    BottomBarItemInterface,
    hideProperty,
    itemsProperty,
    SelectedIndexChangedEventData,
    selectedIndexProperty,
    TITLE_STATE,
    titleStateProperty
} from "../common";
import {Color} from "tns-core-modules/color";
import {fromResource} from "tns-core-modules/image-source";

declare let com, android: any;

let BitmapDrawable = android.graphics.drawable.BitmapDrawable;
let AHBottomNavigation = com.aurelhubert.ahbottomnavigation.AHBottomNavigation;
let AHBottomNavigationItem = com.aurelhubert.ahbottomnavigation.AHBottomNavigationItem;

export class BottomBar extends BottomBarBase {

    _index : number = 0;

    get android(): any {
        return this.nativeView;
    }

    public createNativeView() {

        let nativeView = new AHBottomNavigation(this._context);

        let that = new WeakRef(this);

        nativeView.setOnTabSelectedListener(new AHBottomNavigation.OnTabSelectedListener({

            get owner() : BottomBar {
                return that.get();
            },
            onTabSelected: function (position: number, wasSelected: boolean): boolean {

                if (this.owner && !wasSelected && this.owner._index !== position) {

                    var eventData: SelectedIndexChangedEventData = {
                        eventName: "tabSelected",
                        object: this,
                        oldIndex: this.owner._index,
                        newIndex: position
                    }

                    this.owner._index = position;
                    this.owner.notify(eventData);
                }

                return true;
            }
        }));

        nativeView.setDefaultBackgroundColor(new Color('#333').android);
        nativeView.setColored(true);

        return nativeView;
    }

    [itemsProperty.setNative](value : BottomBarItemInterface[]) {
        let items : BottomBarItem[] = <BottomBarItem[]>value;
        this.createItems(items);
    }

    [selectedIndexProperty.setNative](selectedIndex : number) {
        this._index = selectedIndex;
        this.nativeView.setCurrentItem(selectedIndex);
    }

    [titleStateProperty.setNative](titleState : TITLE_STATE) {

        switch (titleState) {
            case TITLE_STATE.ALWAYS_SHOW:
                this.nativeView.setTitleState(AHBottomNavigation.TitleState.ALWAYS_SHOW);
                break;
            case TITLE_STATE.SHOW_WHEN_ACTIVE:
                this.nativeView.setTitleState(AHBottomNavigation.TitleState.SHOW_WHEN_ACTIVE);
                break;
            case TITLE_STATE.ALWAYS_HIDE:
                this.nativeView.setTitleState(AHBottomNavigation.TitleState.ALWAYS_HIDE);
                break;
        }
    }

    [hideProperty.setNative](hide : boolean) {
        if (hide) {
            this.nativeView.hideBottomNavigation();
        } else {
            this.nativeView.restoreBottomNavigation();
        }
    }

    public changeItemTitle(index: number, title: string) {
        let item = this.items[index];
        if (item.title !== title) {
            this.items[index] = item;
        }
        this.createItems(this.items);
    }

    public changeItemIcon(index: number, icon: string) {
        let item = this.items[index];
        if (item.icon !== icon) {
            this.items[index] = item;
        }
        this.createItems(this.items);
    }

    public changeItemColor(index: number, color: string) {
        let item = this.items[index];
        if (item.color !== color) {
            this.items[index] = item;
        }
        this.createItems(this.items);
    }

    private createItems(items: BottomBarItemInterface[]) {

        this.nativeView.removeAllItems();
        items.forEach((item, idx, aar) => {
            this.items[idx] = new BottomBarItem(item.index, item.title, item.icon, item.color,  item.notification, new WeakRef(this));
            let icon1 = new BitmapDrawable(fromResource(item.icon).android);
            let item1 = new AHBottomNavigationItem(item.title, icon1, new Color(item.color).android);
            this.nativeView.addItem(item1);
            if (item.notification) {
                this.nativeView.setNotification(item.notification, idx)
            }
        });

        this.nativeView.setCurrentItem(this._index);
    }

}

export class BottomBarItem implements BottomBarItemInterface {

    private _title: string;
    private _icon: string;
    private _color: string;
    private _index: number;
    private _notification?: string;
    private _parent?: WeakRef<any>;

    constructor(index: number, title: string, icon: string, color: string, notification?: string, parent?: WeakRef<any>) {
        this._title = title;
        this._icon = icon;
        this._color = color;
        this._index = index;
        if (notification) {
            this._notification = notification;
        }
        if (parent) {
            this._parent = parent;
        }
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        if (this._title !== value && value && this._parent) {
            this._title = value;
            this._parent.get().changeItemTitle(this._index, this._title);
        }
    }

    get icon(): string {
        return this._icon;
    }

    set icon(value: string) {
        if (this._icon !== value && value && this._parent) {
            this._icon = value;
            this._parent.get().changeItemIcon(this._index, this._icon);
        }
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        if (this._color !== value && value && this._parent) {
            this._color = value;
            this._parent.get().changeItemColor(this._index, this._color);
        }
    }

    get index(): number {
        return this._index;
    }

    set index(value: number) {
        this._index = value;
    }

    get notification(): string {
        return this._notification;
    }

    set notification(value: string) {
        if (this._notification !== value && value && this._parent) {
            this._notification = value;
            this._parent.get().nativeView.setNotification(this._notification, this._index);
        }
    }

    get parent(): WeakRef<any> {
        return this._parent;
    }

    set parent(value: WeakRef<any>) {
        this._parent = value;
    }
}