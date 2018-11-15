import { BottomBarBase } from './bottombar.common';
import { fromResource } from "tns-core-modules/image-source";
import { Color } from 'tns-core-modules/color/color';

// Types declaration
export declare type BottomNavigationViewType = android.support.design.widget.BottomNavigationView;
export declare type BottomNavigationItemType = android.view.MenuItem;
export declare type MenuItem = android.view.MenuItem;
// Classes shortcuts
const { BottomNavigationView } = android.support.design.widget;
const { Menu } = android.view;
const  { BitmapDrawable } = android.graphics.drawable;

// export class BottomBar
export class BottomBar extends BottomBarBase {
    get android() {
        return this.nativeView;
    }

    public createNativeView(): BottomNavigationViewType {

        const bottomBar: BottomNavigationViewType = new BottomNavigationView(this._context);

        for (let i = 0; i < 4; i++) {
            bottomBar
                .getMenu()
                .add(Menu.NONE, i, Menu.NONE, `Item ${i}`)
                .setIcon(new BitmapDrawable(fromResource('ic_home_black_24dp').android));
        }

        bottomBar.setBackgroundColor(new Color('#333').android);

        const that = new WeakRef(this);
        bottomBar.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener({
            onNavigationItemSelected: (item: MenuItem) => {
                console.log(item.getItemId());
                return true;
            }
        }));

        return bottomBar;
    }

    public initNativeView(): void {
    }
}
