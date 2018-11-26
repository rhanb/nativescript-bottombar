import { layout, View, Color } from 'tns-core-modules/ui/core/view/view';

import {
    BottomBarBase,
    inactiveTintColor,
    activeTintColor,
    barBackgroundColor
} from '../bottombar.base';
import { BottomBarItem } from '../../bottombar-item/ios/bottombar-item';
import { imageConverter } from '../../utils/utils.common';

export class BottomBarControllerDelegate extends NSObject implements UITabBarControllerDelegate {
    public static ObjCProtocols = [UITabBarControllerDelegate];

    private _owner: WeakRef<BottomBar>;

    public static initWithOwner(owner: WeakRef<BottomBar>): BottomBarControllerDelegate {
        const delegate = <BottomBarControllerDelegate>BottomBarControllerDelegate.new();
        delegate._owner = owner;
        return delegate;
    }

    tabBarControllerDidSelectViewController(tabBarController: UITabBarController, viewController: UIViewController) {
        const owner = this._owner.get();
        owner.onTabSelected(tabBarController.selectedIndex);
    }
}

export class BottomBar extends BottomBarBase {

    public _tabBarController: UITabBarController;
    private _delegate: BottomBarControllerDelegate;
    items: BottomBarItem[];

    nativeView: UITabBar;

    get ios(): UITabBar {
        return this.nativeView;
    }

    public createNativeView(): UITabBar {
        this._tabBarController = UITabBarController.new();

        this._tabBarController.viewControllers = (NSArray as any).arrayWithArray(
            this.items.map(item => item.viewController)
        );

        const actualHeight = this.getActualSize().height;
        this.height = actualHeight ? actualHeight : 49;

        return this._tabBarController.tabBar;
    }

    _addChildFromBuilder(name: string, value: BottomBarItem) {
        if (name === 'BottomBarItem') {
            const itemViewController = this.createItem(value, this.items.length);

            if (itemViewController) {
                value.viewController = itemViewController;
                value.setNativeView(itemViewController.tabBarItem);
                this.items.push(value);
            }
        }
    }

    public initNativeView(): void {
        super.initNativeView();
        this._delegate = this._tabBarController.delegate = BottomBarControllerDelegate.initWithOwner(new WeakRef(this));
    }

    private createItem(item: BottomBarItem, id: number): UIViewController {
        const itemViewController: UIViewController = UIViewController.new();
        itemViewController.tabBarItem = UITabBarItem.new();

        if (item._icon && item._title) {
            item.index = id;

            
            itemViewController.tabBarItem = itemViewController.tabBarItem.initWithTitleImageTag(
                item._title,
                imageConverter(item._icon).ios,
                item.index
            )

            if (item._checkedIcon) {
                itemViewController.tabBarItem.selectedImage = imageConverter(item._checkedIcon).ios;
            }

            if (item._badge) {
                itemViewController.tabBarItem.badgeValue = item._badge;
            }

        } else {
            itemViewController.tabBarItem.init();
            itemViewController.tabBarItem.tag = id;
        }

        return itemViewController;
    }

    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        const width = layout.getMeasureSpecSize(widthMeasureSpec);
        const widthMode = layout.getMeasureSpecMode(widthMeasureSpec);

        const height = layout.getMeasureSpecSize(heightMeasureSpec);
        const heightMode = layout.getMeasureSpecMode(heightMeasureSpec);

        const widthAndState = View.resolveSizeAndState(width, width, widthMode, 0);
        const heightAndState = View.resolveSizeAndState(height, height, heightMode, 0);

        this.setMeasuredDimension(widthAndState, heightAndState);
    }

    [inactiveTintColor.getDefault](): UIColor {
        return this.nativeView.unselectedItemTintColor;
    }

    [inactiveTintColor.setNative](color: Color): void {
        this.nativeView.unselectedItemTintColor = color.ios;
    }

    [activeTintColor.getDefault](): UIColor {
        return this.nativeView.tintColor;
    }

    [activeTintColor.setNative](color: Color): void {
        this.nativeView.tintColor = color.ios;
    }

    [barBackgroundColor.getDefault](): UIColor {
        return this.nativeView.barTintColor;
    }

    [barBackgroundColor.setNative](color: Color): void {
        this.nativeView.barTintColor = color.ios;
    }
}