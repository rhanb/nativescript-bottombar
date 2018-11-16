import { View, CssProperty, Style, Color, EventData, AddChildFromBuilder, Property } from 'tns-core-modules/ui/core/view';
import { BottomBarItemBase } from './bottombar-item.base';

export abstract class BottomBarBase extends View implements AddChildFromBuilder {

    items: BottomBarItemBase[];

    selectedIndex: number;

    get inactiveTintColor(): string {
        return this.style.inactiveTintColor;
    }

    set inactiveTintColor(color: string) {
        this.style.inactiveTintColor = color;
    }

    get activeTintColor(): string {
        return this.style.activeTintColor;
    }

    set activeTintColor(color: string) {
        this.style.activeTintColor = color;
    }

    get barBackgroundColor(): string {
        return this.style.barBackgroundColor;
    }

    set barBackgroundColor(color: string) {
        this.style.barBackgroundColor = color;
    }

    constructor() {
        super();
        this.selectedIndex = 0;
        this.items = <BottomBarItemBase[]>[];
    }

    public initNativeView(): void {
        this.createItems();
    }

    protected abstract createItems();

    public _addChildFromBuilder(name: string, value: BottomBarItemBase): void {
        this.items.push(value);
    }

    public onTabSelected(newIndex: number): void {
        const oldIndex = this.selectedIndex;
        this.selectedIndex = newIndex;
        this.notify({
            eventName: 'tabSelected',
            object: this,
            oldIndex: oldIndex,
            newIndex: this.selectedIndex
        });
    }
}

// https://developer.android.com/reference/com/google/android/material/bottomnavigation/LabelVisibilityMode.html#LABEL_VISIBILITY_AUTO
export enum LABEL_VISIBILITY {
    AUTO = -1,
    LABELED = 1,
    SELECTED = 0,
    UNLABELED = 2
}

/**
 * Properties
 */
export const items = new Property<BottomBarBase, BottomBarItemBase[]>({
    name: 'items', equalityComparer: (oldValue: BottomBarItemBase[], newValue: BottomBarItemBase[]) => {
        return !oldValue && !newValue && oldValue.length === oldValue.length;
    }
});

export const androidLabelVisibility = new Property<BottomBarBase, LABEL_VISIBILITY>({
    name: 'androidLabelVisibility', equalityComparer:((oldValue: LABEL_VISIBILITY, newValue: LABEL_VISIBILITY) => {
        return oldValue !== newValue;
    })
});
/**
 * CSS Properties 
 */
declare module 'tns-core-modules/ui/styling/style' {
    interface Style {
        inactiveTintColor: string;
        barBackgroundColor: string;
        activeTintColor: string;
    }
}

export const inactiveTintColor = new CssProperty<Style, string>({
    name: 'inactiveTintColor', cssName: 'inactive-tint-color', defaultValue: '#d3d3d3', valueConverter: colorConverter
});
inactiveTintColor.register(Style);

export const barBackgroundColor = new CssProperty<Style, string>({
    name: 'barBackgroundColor', cssName: 'bar-background-color', defaultValue: 'white', valueConverter: colorConverter
});
barBackgroundColor.register(Style);

export const activeTintColor = new CssProperty<Style, string>({
    name: 'activeTintColor', cssName: 'active-tint-color', defaultValue: 'black', valueConverter: colorConverter
});
activeTintColor.register(Style);

function colorConverter(colorValue: string) {
    return colorValue;
};

export function getNativeColor(color: string, platform: 'ios' | 'android') {
    return new Color(color)[platform];
}

export interface TabSelectedEventData extends EventData{
    oldIndex: number;
    newIndex: number;
}