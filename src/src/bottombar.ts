import { View } from "tns-core-modules/ui/core/view";
import { Property } from "tns-core-modules/ui/core/properties";
import { EventData } from "tns-core-modules/data/observable";
import { Notification } from "./notification";

/*
* TITLE_STATE enum which represents three different way of displaying the BottomBar
*/
export const enum TITLE_STATE {
    // Will show the title of the tab only when selected
    SHOW_WHEN_ACTIVE,
    // Will show the title of all tabs
    ALWAYS_SHOW,
    // Will never show the title of all tabs
    ALWAYS_HIDE
}

/*
* Event interface for selectedIndex property changed
*/ 
export interface SelectedIndexChangedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}
/*
* Contains the BottomBar view, which represent a Bottom Navigation component.
*/
export abstract class BottomBarBase extends View {
    /*
    * Get or set the BottomBar tabs
    */
    public items: any[];
    /*
    * Get or set the current selected tab index
    */
    private _selectedIndex: number = 0;
    public get selectedIndex (): number {
        return this._selectedIndex;
    }
    public set selectedIndex (index: number) {
        if (index !== this._selectedIndex) {
            this._selectedIndex = index;
        }
    }
    /*
    * Method allowing to manually selected a tab
    */
    public selectItem(index: number): void {
        if (index !== this._selectedIndex) {
            this._selectedIndex = index;
            this.selectItemNative(index);
        }
    }
    /*
    * Method allowing to selected a tab natively
    */
    public abstract selectItemNative(index: number): void;
    /*
    * Get or set the title state of the BottomBar
    */
    public titleState: TITLE_STATE;
    /*
    * Get or set hide property to hide or show the BottomBar with animation
    */
    public hide: boolean;
    /*
    * Get or set the color of the icon and the title  of the selected tab
    */
    public accentColor: string;
    /*
    * Get or set the colors of the icons and the titles of not selected tabs
    */
    public inactiveColor: string;
    /*
    * Get or set the backgroundColor of the BottomBar when colored is false
    */
    public uncoloredBackgroundColor: string;
    /*
    * Get or set the colored property allowing to have a colored or non colored BottomBar
    */
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

export const uncoloredBackgroundColorProperty = new Property<BottomBarBase, string>({
    name: "uncoloredBackgroundColor"
});

uncoloredBackgroundColorProperty.register(BottomBarBase);

export const coloredProperty = new Property<BottomBarBase, boolean>({
    name: "colored",
    valueConverter: value => Boolean(value)
});

coloredProperty.register(BottomBarBase);
