import { CssProperty, Style, Color, AddChildFromBuilder, Property, View } from 'tns-core-modules/ui/core/view';
import { BottomBarItemBase } from '../bottombar-item/bottombar-item.base';
import { LABEL_VISIBILITY } from './android/label-visibility.enum';
export declare namespace knownCollections {
    const items = "items";
}
export declare abstract class BottomBarBase extends View implements AddChildFromBuilder {
    items: BottomBarItemBase[];
    selectedIndex: number;
    inactiveTintColor: Color;
    activeTintColor: Color;
    barBackgroundColor: Color;
    constructor();
    abstract _addChildFromBuilder(name: string, value: BottomBarItemBase): void;
    onTabSelected(newIndex: number): void;
}
export declare const items: Property<BottomBarBase, BottomBarItemBase[]>;
export declare const androidLabelVisibility: Property<BottomBarBase, LABEL_VISIBILITY>;
declare module 'tns-core-modules/ui/styling/style' {
    interface Style {
        inactiveTintColor: Color;
        barBackgroundColor: Color;
        activeTintColor: Color;
    }
}
export declare const inactiveTintColor: CssProperty<Style, Color>;
export declare const barBackgroundColor: CssProperty<Style, Color>;
export declare const activeTintColor: CssProperty<Style, Color>;
