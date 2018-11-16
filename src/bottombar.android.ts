import { BottomBarBase, inactiveTintColor, activeTintColor, barBackgroundColor, getNativeColor, items, LABEL_VISIBILITY, androidLabelVisibility } from './bottombar.base';
import { fromResource, ImageSource } from "tns-core-modules/image-source";
import { Property } from 'tns-core-modules/ui/core/properties';
import { BottomBarItemBase } from './bottombar-item.base';

// Types declaration
export declare type BottomNavigationViewType = android.support.design.widget.BottomNavigationView;
export declare type BottomNavigationItemType = android.view.MenuItem;
export declare type MenuItem = android.view.MenuItem;
export declare type Menu = android.view.Menu;
// Classes shortcuts
const { BottomNavigationView } = android.support.design.widget;
const { Menu } = android.view;
const  { BitmapDrawable } = android.graphics.drawable;

export class BottomBar extends BottomBarBase {
    get android() {
        return this.nativeView;
    }

    public createNativeView(): BottomNavigationViewType {

        const bottomBar: BottomNavigationViewType = new BottomNavigationView(this._context);

        const owner = new WeakRef(this);
        bottomBar.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener({
            onNavigationItemSelected: (item: MenuItem) => {
                owner.get().onTabSelected(item.getItemId());
                return true;
            }
        }));

        // Typings don't match design API >28.0
        (bottomBar as any).setLabelVisibilityMode(LABEL_VISIBILITY.AUTO);

        return bottomBar;
    }

    protected createItems() {
        const menu: Menu  = (this.nativeView as BottomNavigationViewType).getMenu();
        
        if (menu.size() > 0) {
            menu.clear();
        }

        this.items.forEach((item: BottomBarItemBase, index: number) => {
            if (item.icon && item.title) {

                const icon: ImageSource = fromResource(item.icon);
                if (!icon) {
                    throw new Error(`Enable to find resource: ${item.icon}`);
                }

                menu.add(Menu.NONE, index, Menu.NONE, item.title)
                    .setIcon(new BitmapDrawable(icon.android));
            }
        });
    }
    

    private setItemsColorStateList(activeTintColor: number, inactiveTintColor: number): void {
        const stateUnChecked = Array.create('int', 1);
        stateUnChecked[0] = -android.R.attr.state_checked;
        const defaultState = Array.create('int', 0);

        const states = java.lang.reflect.Array.newInstance(stateUnChecked.getClass() || defaultState.getClass(), 2);
        states[0] = stateUnChecked;
        states[1] = defaultState;

        const colors = Array.create('int', 2);
        colors[0] = inactiveTintColor;
        colors[1] = activeTintColor;

        const bottomBar: BottomNavigationViewType = this.nativeView;

        const colorStateList = new android.content.res.ColorStateList(states, colors);
        bottomBar.setItemTextColor(colorStateList);
        bottomBar.setItemIconTintList(colorStateList);
    }

    [items.setNative](items: BottomBarItemBase[]) {
        this.createItems();
    }

    [inactiveTintColor.setNative](color: string): void {
        const nativeInactiveTintColor = getNativeColor(color, 'android'),
            nativeActiveTintColor = getNativeColor(this.activeTintColor, 'android');
                

        this.setItemsColorStateList(nativeActiveTintColor, nativeInactiveTintColor);
    }


    [activeTintColor.setNative](color: string): void {
        const nativeActivetintColor = getNativeColor(color, 'android'),
        nativeInactiveTintColor = getNativeColor(this.inactiveTintColor, 'android');
        
        this.setItemsColorStateList(nativeActivetintColor, nativeInactiveTintColor);
    }

    [barBackgroundColor.setNative](color: string): void {
        const backgroundColor = getNativeColor(color, 'android');
        (this.nativeView as BottomNavigationViewType).setBackgroundColor(backgroundColor);
    }

    [androidLabelVisibility.setNative](labelVisibility: LABEL_VISIBILITY): void {
        // Typings don't match design API >28.0
        console.log(labelVisibility);
        (this.nativeView as any).setLabelVisibilityMode(labelVisibility);
    }
}
