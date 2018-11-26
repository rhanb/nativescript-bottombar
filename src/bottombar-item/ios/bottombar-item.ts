import { Color } from 'tns-core-modules/color/color';

import { BottomBarItemBase } from '../bottombar-item.base';
import { imageConverter } from '../../utils/utils.common';

export class BottomBarItem extends BottomBarItemBase {
    nativeView: UITabBarItem;

    get ios(): UITabBarItem {
        return this.nativeView;
    }

    set icon(image: string) {
        if (this._icon !== image) {
            this._icon = image;
            if (this.nativeView) {
                this.nativeView.image = imageConverter(this._icon).ios;
            }
        }
    }

    set title(value: string) {
        if (this._title !== value) {
            this._title = value;
            if ( this.nativeView) {
                this.nativeView.title = this._title;
            }
        }
    }

    set checkedIcon(image: string) {
        if (this._checkedIcon !== image) {
            this._checkedIcon = image;
            if (this.nativeView) {
                this.nativeView.selectedImage = imageConverter(this._checkedIcon).ios;
            }
        }
    }

    set badge(value: string) {
        if (this._badge !== value) {
            this._badge = value;
            if (this.nativeView) {
                // Need to be null to remove badge
                this.nativeView.badgeValue = this._badge === '' 
                    ? null 
                    : this._badge;
            }
        }
    }

    set badgeBackgroundColor(color: string) {
        if (this._badgeBackgroundColor !== color) {
            this._badgeBackgroundColor = color;
            if (this.nativeView) {
                this.nativeView.badgeColor = new Color(color).ios
            }               
        }
    }
}