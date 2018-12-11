import { BottomBarBase } from '../bottombar.base';
import { BottomBarItem } from '../../bottombar-item/android/bottombar-item';
export declare type BottomNavigationViewType = android.support.design.widget.BottomNavigationView;
export declare type MenuItemType = android.view.MenuItem;
export declare type MenuType = android.view.Menu;
export declare class BottomBar extends BottomBarBase {
    nativeView: BottomNavigationViewType;
    _items: BottomBarItem[];
    readonly android: globalAndroid.support.design.widget.BottomNavigationView;
    createNativeView(): BottomNavigationViewType;
    _addChildFromBuilder(name: string, value: BottomBarItem): void;
    private createItem(item, id, bottomBar);
    protected createItems(bottomNavigationView: BottomNavigationViewType): void;
    private createBadges(bottomNavigationView);
    private setItemsColorStateList(activeTintColor, inactiveTintColor, bottomBarValue?);
    onTabSelected(index: number): void;
    private getItemByIndex(index);
    selectItem(index: number): void;
}
