import { View, ViewBase, Observable, AddChildFromBuilder, EventData } from 'tns-core-modules/ui/core/view';
import { Color } from 'tns-core-modules/color/color';
import { ImageSource } from 'tns-core-modules/image-source/image-source';

export declare class BottomBarItem extends View {
    index?: number;
    nativeView: any;
    readonly ios: any;
    readonly android: any;
    icon: string;
    title: string;
    checkedIcon: string;
    badge: string;
    badgeBackgroundColor: string;
    initNativeView(): void;
}

export declare class BottomBar extends View implements AddChildFromBuilder {
    items: BottomBarItem[];
    selectedIndex: number;
    inactiveTintColor: Color;
    activeTintColor: Color;
    barBackgroundColor: Color;
    onTabSelected(newIndex: number): void;
    _addChildFromBuilder(name: string, value: BottomBarItem): void;
    selectItem(index: number): void;
    nativeView: any;
    readonly ios: any;
    readonly android: any;
}

export declare enum LABEL_VISIBILITY {
    AUTO = -1,
    LABELED = 1,
    SELECTED = 0,
    UNLABELED = 2,
}

export interface TabSelectedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}
