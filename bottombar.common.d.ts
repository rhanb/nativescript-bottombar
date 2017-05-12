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
export interface BottomBarItemInterface {
    title: string;
    icon: string;
    color: string;
    index: number;
    notification?: string;
    parent?: WeakRef<any>;
}
export declare class BottomBarBase extends View {
    items: BottomBarItemInterface[];
    selected: number;
    titleState: TITLE_STATE;
    hide: boolean;
}
export declare const itemsProperty: Property<BottomBarBase, BottomBarItemInterface[]>;
export declare const selectedIndexProperty: Property<BottomBarBase, number>;
export declare const titleStateProperty: Property<BottomBarBase, TITLE_STATE>;
export declare const hideProperty: Property<BottomBarBase, boolean>;
