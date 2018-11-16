import { BottomBarBase } from './bottombar.base';
import { View } from 'tns-core-modules/ui/core/view';

export declare class BottomBarItemBase {
    index?: number;
    title: string;
    icon: string;
    bottomBar?: WeakRef<BottomBarBase>;
    constructor(title: string, icon: string, bottomBar?: WeakRef<BottomBarBase>);
}

export declare class BottomBar extends BottomBarBase {
    readonly android: any;
    createNativeView(): any;
    protected createItems(): void;
    private setItemsColorStateList(activeTintColor, inactiveTintColor);
    private _tabBarController;
    private _delegate;
    readonly ios: any;
    initNativeView(): void;
    onLoaded(): void;
    onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void;
}
