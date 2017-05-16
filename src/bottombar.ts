import { View } from "tns-core-modules/ui/core/view";
import { Property } from "tns-core-modules/ui/core/properties";
import { EventData } from "tns-core-modules/data/observable";
import { Notification } from "./notification";

export const enum TITLE_STATE {
    SHOW_WHEN_ACTIVE,
    ALWAYS_SHOW,
    ALWAYS_HIDE
}

export interface SelectedIndexChangedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}

export abstract class BottomBarBase extends View {
    public items: any[];
    private _selectedIndex: number = 0;
    public get selectedIndex (): number {
        return this._selectedIndex;
    }
    public set selectedIndex (index: number) {
        if (index !== this._selectedIndex) {
            this._selectedIndex = index;
        }
    }
    public selectItem(index: number): void {
        if (index !== this._selectedIndex) {
            this._selectedIndex = index;
            this.selectItemNative(index);
        }
    }
    public abstract selectItemNative(index: number): void;
    public titleState: TITLE_STATE;
    public hide: boolean;
    public accentColor: string;
    public inactiveColor: string;
    public colored: boolean;
}

export const itemsProperty = new Property<BottomBarBase, any[]>({
    name: "items",
    equalityComparer: (a: any[], b: any[]) => !a && !b && a.length === b.length
});

itemsProperty.register(BottomBarBase);

export const titleStateProperty = new Property<BottomBarBase, TITLE_STATE>({
    name: "titleState"
});

titleStateProperty.register(BottomBarBase);



export const hideProperty = new Property<BottomBarBase, boolean>({
    name: "hide",
    valueConverter: value => Boolean(value)
});

hideProperty.register(BottomBarBase);

export const accentColorProperty = new Property<BottomBarBase, string>({
    name: "accentColor"
});

accentColorProperty.register(BottomBarBase);

export const inactiveColorProperty = new Property<BottomBarBase, string>({
    name: "inactiveColor"
});

inactiveColorProperty.register(BottomBarBase);

export const coloredProperty = new Property<BottomBarBase, boolean>({
    name: "colored",
    valueConverter: value => Boolean(value)
});

coloredProperty.register(BottomBarBase);
