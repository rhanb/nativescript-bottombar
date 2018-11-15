import { BottomBarBase, inactiveTintColor, activeTintColor, barBackgroundColor } from './bottombar.common';
import { fromResource } from 'tns-core-modules/image-source/image-source';
import { Color } from 'tns-core-modules/color/color';

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
        owner.tabSelected(tabBarController.selectedIndex);
    }
}

export class BottomBar extends BottomBarBase {

    private _tabBarController: UITabBarController;
    private _delegate: BottomBarControllerDelegate;

    get ios(): UITabBar {
        return this.nativeView;
    }

    public initNativeView(): void {
        super.initNativeView();
        this._delegate = BottomBarControllerDelegate.initWithOwner(new WeakRef(this));
    }

    public createNativeView(): UITabBar {

        const tabBarController: UITabBarController = UITabBarController.new();

        const firstVc = UIViewController.new();
        firstVc.tabBarItem = UITabBarItem
            .new()
            .initWithTitleImageTag(
                'Home',
                fromResource('ic_home_black_24dp').ios,
                0
            );

        const secondVc = UIViewController.new();
        secondVc.tabBarItem = UITabBarItem
            .new()
            .initWithTitleImageTag(
                'Home',
                fromResource('ic_home_black_24dp').ios,
                1
            );
        
        tabBarController.viewControllers = NSArray.arrayWithArray([firstVc, secondVc]);

        this._tabBarController = tabBarController;

        return tabBarController.tabBar;
    }

    public onLoaded(): void {
        super.onLoaded();
        this._tabBarController.delegate = this._delegate;
    }

    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        this.setMeasuredDimension(widthMeasureSpec, heightMeasureSpec);
    }

    public tabSelected(tabIndex: number) {
        console.dir(tabIndex);
    }

    [inactiveTintColor.getDefault](): string {
        return this.nativeView.unselectedItemTintColor;
    }

    [inactiveTintColor.setNative](color: string): void {
        this.nativeView.unselectedItemTintColor = new Color(color).ios;
    }

    [activeTintColor.getDefault](): string {
        return this.nativeView.tintColor;
    }

    [activeTintColor.setNative](color: string): void {
        this.nativeView.tintColor = new Color(color).ios;
    }

    [barBackgroundColor.getDefault](): string {
        return this.nativeView.barTintColor;
    }

    [barBackgroundColor.setNative](color: string): void {
        this.nativeView.barTintColor = new Color(color).ios;
    }
}
