import {
    CssProperty,
    Style,
    Color,
    AddChildFromBuilder,
    Property,
    View,
    CSSType,
    isAndroid
} from 'tns-core-modules/ui/core/view';
import { BottomBarItemBase } from '../bottombar-item/bottombar-item.base';
import { colorConverter } from '../utils/utils.common';
import { TabSelectedEventData, LABEL_VISIBILITY } from './bottombar.common';

export namespace knownCollections {
    export const items = 'items';
}

@CSSType('BottomBar')
export abstract class BottomBarBase extends View implements AddChildFromBuilder {

    protected _items: BottomBarItemBase[];
    get items(): BottomBarItemBase[] {
        return this._items;
    };

    selectedIndex: number;

    get inactiveTintColor(): Color {
        return this.style.inactiveTintColor;
    }

    set inactiveTintColor(color: Color) {
        this.style.inactiveTintColor = color;
    }

    get activeTintColor(): Color {
        return this.style.activeTintColor;
    }

    set activeTintColor(color: Color) {
        this.style.activeTintColor = color;
    }

    get barBackgroundColor(): Color {
        return this.style.barBackgroundColor;
    }

    set barBackgroundColor(color: Color) {
        this.style.barBackgroundColor = color;
    }

    constructor() {
        super();
        this.selectedIndex = 0;
        this._items = <BottomBarItemBase[]>[];
    }


    public abstract _addChildFromBuilder(name: string, value: BottomBarItemBase): void;

    public abstract selectItem(index: number): void;

    public onTabSelected(newIndex: number): void {
        const oldIndex = this.selectedIndex;
        this.selectedIndex = newIndex;
        this.notify(<TabSelectedEventData>{
            eventName: 'tabSelected',
            object: this,
            oldIndex: oldIndex,
            newIndex: this.selectedIndex
        });
    }
}

/**
 * Properties
 */
export const items = new Property<BottomBarBase, BottomBarItemBase[]>({
    name: 'items',
    affectsLayout: true,
    defaultValue: []
});
items.register(BottomBarBase);

export const androidLabelVisibility = new Property<BottomBarBase, LABEL_VISIBILITY>({
    name: 'androidLabelVisibility',
    equalityComparer: (oldValue: LABEL_VISIBILITY, newValue: LABEL_VISIBILITY) => oldValue === newValue,
    affectsLayout: isAndroid,
    defaultValue: LABEL_VISIBILITY.AUTO
});
androidLabelVisibility.register(BottomBarBase);
/**
 * CSS Properties
 */
declare module 'tns-core-modules/ui/styling/style' {
    interface Style {
        inactiveTintColor: Color;
        barBackgroundColor: Color;
        activeTintColor: Color;
    }
}

export const inactiveTintColor = new CssProperty<Style, Color>({
    name: 'inactiveTintColor',
    cssName: 'inactive-tint-color',
    defaultValue: new Color('#d3d3d3'),
    valueConverter: colorConverter,
    equalityComparer: Color.equals
});
inactiveTintColor.register(Style);

export const barBackgroundColor = new CssProperty<Style, Color>({
    name: 'barBackgroundColor',
    cssName: 'bar-background-color',
    defaultValue: new Color('white'),
    valueConverter: colorConverter,
    equalityComparer: Color.equals
});
barBackgroundColor.register(Style);

export const activeTintColor = new CssProperty<Style, Color>({
    name: 'activeTintColor',
    cssName: 'active-tint-color',
    defaultValue: new Color('black'),
    valueConverter: colorConverter,
    equalityComparer: Color.equals
});
activeTintColor.register(Style);