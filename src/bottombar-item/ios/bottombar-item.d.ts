import { BottomBarItemBase } from '../bottombar-item.base';
export declare class BottomBarItem extends BottomBarItemBase {
    nativeView: UITabBarItem;
    readonly ios: UITabBarItem;
    icon: string;
    title: string;
    checkedIcon: string;
    badge: string;
    badgeBackgroundColor: string;
}
