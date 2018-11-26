import { View } from 'tns-core-modules/ui/core/view';

export class BottomBarItemBase extends View {
    index?: number;

    _title: string;
    get title(): string {
        return this._title;
    }

    _badge: string;
    get badge(): string {
        return this._badge;
    }

    _icon: string;
    get icon(): string {
        return this._icon;
    }

    _checkedIcon?: string;
    get checkedIcon(): string {
        return this._checkedIcon;
    }

    _badgeBackgroundColor?: string;
    get badgeBackgroundColor(): string {
        return this._badgeBackgroundColor;
    }
}
