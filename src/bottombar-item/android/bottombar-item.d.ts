import { Label } from 'tns-core-modules/ui/label/label';
import { BottomBarItemBase } from '../bottombar-item.base';
import { MenuItemType } from '../../bottombar.android';
import { BottomNavigationViewType } from '../../bottombar/android/bottombar';
export declare class BottomBarItem extends BottomBarItemBase {
    nativeView: MenuItemType;
    _badgeView: Label;
    readonly android: MenuItemType;
    initNativeView(): void;
    icon: string;
    title: string;
    checkedIcon: string;
    badge: string;
    badgeBackgroundColor: string;
    setViewBadge(bottomBar?: BottomNavigationViewType, context?: any): void;
    createViewBadge(bottomBar: BottomNavigationViewType, context: any): Label;
}
