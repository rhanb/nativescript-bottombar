import { View } from 'tns-core-modules/ui/core/view';
export declare class BottomBarItemBase extends View {
    index?: number;
    _title: string;
    readonly title: string;
    _badge: string;
    readonly badge: string;
    _icon: string;
    readonly icon: string;
    _checkedIcon?: string;
    readonly checkedIcon: string;
    _badgeBackgroundColor?: string;
    readonly badgeBackgroundColor: string;
}
