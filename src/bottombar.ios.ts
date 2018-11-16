import { BottomBarBase, inactiveTintColor, activeTintColor, barBackgroundColor } from './bottombar.base';
import { fromResource, ImageSource } from 'tns-core-modules/image-source/image-source';
import { Color } from 'tns-core-modules/color/color';
import { BottomBarItemBase } from './bottombar-item.base';

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

    private _tabBarController: UITabBarController;
    private _delegate: BottomBarControllerDelegate;

    get ios(): UITabBar {
        return this.nativeView;
    }


    public createNativeView(): UITabBar {
        this._tabBarController = UITabBarController.new();
        this._tabBarController.viewControllers = NSArray.arrayWithArray([]);
        return this._tabBarController.tabBar;
    }

    public initNativeView(): void {
        super.initNativeView();
        this._delegate = BottomBarControllerDelegate.initWithOwner(new WeakRef(this));
    }

    protected createItems() {
        const controllers = [];

        if (this._tabBarController.viewControllers
            && this._tabBarController.viewControllers.count > 0) {
                this._tabBarController.viewControllers = null;
        }

        this.items.forEach((item: BottomBarItemBase, index: number) => {
            if (item.icon && item.title) {

                const icon: ImageSource = fromResource(item.icon);

                if (!icon) {
                    throw new Error(`Enable to find resource: ${item.icon}`);
                }

                const itemVc = UIViewController.new();
                itemVc.tabBarItem = UITabBarItem.new().initWithTitleImageTag(
                    item.title,
                    icon.ios,
                    index
                )
                
                controllers.push(itemVc);
            }
        });
        this._tabBarController.viewControllers = NSArray.arrayWithArray(controllers);
    }

    public onLoaded(): void {
        super.onLoaded();
        this._tabBarController.delegate = this._delegate;
    }

    public onMeasure(widthMeasureSpec: number, heightMeasureSpec: number): void {
        this.setMeasuredDimension(widthMeasureSpec, heightMeasureSpec);
    }

    [inactiveTintColor.getDefault](): UIColor {
        return this.nativeView.unselectedItemTintColor;
    }

    [inactiveTintColor.setNative](color: string): void {
        this.nativeView.unselectedItemTintColor = new Color(color).ios;
    }

    [activeTintColor.getDefault](): UIColor {
        return this.nativeView.tintColor;
    }

    [activeTintColor.setNative](color: string): void {
        this.nativeView.tintColor = new Color(color).ios;
    }

    [barBackgroundColor.getDefault](): UIColor {
        return this.nativeView.barTintColor;
    }

    [barBackgroundColor.setNative](color: string): void {
        this.nativeView.barTintColor = new Color(color).ios;
    }
}
