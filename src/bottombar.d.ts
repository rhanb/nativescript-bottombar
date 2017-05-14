import { View } from "tns-core-modules/ui/core/view";
import { Property } from "tns-core-modules/ui/core/properties";
import { EventData } from "tns-core-modules/data/observable";
export declare const enum TITLE_STATE {
    SHOW_WHEN_ACTIVE = 0,
    ALWAYS_SHOW = 1,
    ALWAYS_HIDE = 2,
}
export interface SelectedIndexChangedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}
export declare class BottomBarBase extends View {
    items: any[];
    selectedIndex: number;
    titleState: TITLE_STATE;
    hide: boolean;
    accentColor: string;
    inactiveColor: string;
    colored: boolean;
}
export declare const itemsProperty: Property<BottomBarBase, any[]>;
export declare const selectedIndexProperty: Property<BottomBarBase, number>;
export declare const titleStateProperty: Property<BottomBarBase, TITLE_STATE>;
export declare const hideProperty: Property<BottomBarBase, boolean>;
export declare const accentColorProperty: Property<BottomBarBase, string>;
export declare const inactiveColorProperty: Property<BottomBarBase, string>;
export declare const coloredProperty: Property<BottomBarBase, boolean>;
