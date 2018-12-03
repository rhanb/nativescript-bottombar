import { Label } from 'tns-core-modules/ui/label/label';
import { Color } from 'tns-core-modules/color/color';

import { BottomBarItemBase } from '../bottombar-item.base';
import { MenuItemType } from '../../bottombar.android';
import { BottomNavigationViewType } from '../../bottombar/android/bottombar';
import { createIconsStateListDrawable } from '../../utils/android/utils';

export class BottomBarItem extends BottomBarItemBase {
    nativeView: MenuItemType;
    _badgeView: Label;
    get android(): MenuItemType {
        return this.nativeView;
    }

    initNativeView() {
        // calling setNativeView triggers the
        // error 'nativeViewProtected.isClickable is not a function'
        this.nativeViewProtected.isClickable = () => true;
        super.initNativeView();
    }

    set icon(image: string) {
        if (this._icon !== image) {
            this._icon = image;
            if (this.nativeView) {
                this.nativeView
                    .setIcon(createIconsStateListDrawable(this._icon, this._checkedIcon));
            }
        }
    }

    set title(value: string) {
        if (this._title !== value) {
            this._title = value;
            if (this.nativeView) {
                this.nativeView.setTitle(this._title);
            }
        }
    }

    set checkedIcon(image: string) {
        if (this._checkedIcon !== image) {
            this._checkedIcon = image;
            if (this.nativeView) {
                this.nativeView
                    .setIcon(createIconsStateListDrawable(this._icon, this._checkedIcon));
            }
        }
    }

    set badge(value: string) {
        if (this._badge !== value) {
            this._badge = value;
            this.setViewBadge();
        }
    }

    set badgeBackgroundColor(color: string) {
        if (this._badgeBackgroundColor !== color) {
            this._badgeBackgroundColor = color;
            this.setViewBadge();
        }
    }


    setViewBadge(bottomBar?: BottomNavigationViewType, context?: any) {
        if (!this._badgeView) {
            if (bottomBar && context) {
                this._badgeView = this.createViewBadge(bottomBar, context);
            }
        } else {
            if (this._badge) {
                this._badgeView.text = this._badge;
                if (this._badgeView.visibility === 'hidden') {
                    this._badgeView.visibility = 'visible';
                }
            } else {
                this._badgeView.visibility = 'hidden';
            }

            if (this._badgeBackgroundColor) {
                this._badgeView.backgroundColor = this._badgeBackgroundColor;
            }
        }
    }

    createViewBadge(bottomBar: BottomNavigationViewType, context: any): Label {
        const textView = new Label();
        textView.text = this._badge ? this._badge : '';
        textView.textAlignment = textView.horizontalAlignment = 'center';
        textView.fontSize = 8;
        textView.color = new Color('white');
        textView.backgroundColor = this._badgeBackgroundColor
            ? this._badgeBackgroundColor
            : 'red';
        textView.borderRadius = '10';
        textView.width = 13;
        textView.height = 13;
        textView.marginLeft = 10;
        textView.marginTop = 5;
        textView._setupUI(context);
        textView.onLoaded();

        const itemView = (bottomBar.getChildAt(0) as any)
            .getChildAt(this.index);

        itemView.addView(textView.android);

        return textView;
    }
}