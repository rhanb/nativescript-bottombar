import { BottomBarBase } from '../bottombar.base';
import { BottomBarItem } from '../../bottombar-item/android/bottombar-item';
export declare type BottomNavigationViewType = android.support.design.widget.BottomNavigationView;
export declare type MenuItemType = android.view.MenuItem;
export declare type MenuType = android.view.Menu;
export declare class BottomBar extends BottomBarBase {
    nativeView: BottomNavigationViewType;
    items: BottomBarItem[];
    readonly android: globalAndroid.support.design.widget.BottomNavigationView;
    createNativeView(): BottomNavigationViewType;
    _addChildFromBuilder(name: string, value: BottomBarItem): void;
    initNativeView(): void;
    onLoaded(): void;
    private createItem(item, id, bottomBar);
    protected createItems(bottomNavigationView: BottomNavigationViewType): void;
    private setItemsColorStateList(activeTintColor, inactiveTintColor);
    onTabSelected(index: number): void;
    hide(): void;
    show(): void;
}
