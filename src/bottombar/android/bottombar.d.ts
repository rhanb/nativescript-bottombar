import { BottomBarBase } from '../bottombar.base';
import { BottomBarItem } from '../../bottombar-item/android/bottombar-item';
export declare type BottomNavigationViewType = com.google.android.material.bottomnavigation.BottomNavigationView;
export declare type MenuItemType = android.view.MenuItem;
export declare type MenuType = android.view.Menu;
export declare class BottomBar extends BottomBarBase {
    nativeView: BottomNavigationViewType;
    _items: BottomBarItem[];
    readonly android: com.google.android.material.bottomnavigation.BottomNavigationView;
    createNativeView(): BottomNavigationViewType;
    _addChildFromBuilder(name: string, value: BottomBarItem): void;
    private createItem;
    protected createItems(bottomNavigationView: BottomNavigationViewType): void;
    private createBadges;
    private setItemsColorStateList;
    onTabSelected(index: number): void;
    private getItemByIndex;
    selectItem(index: number): void;
}
