import { imageConverter } from "../utils.common";

export declare type StateListDrawableType = android.graphics.drawable.StateListDrawable;

const { StateListDrawable } = android.graphics.drawable;
const  { BitmapDrawable } = android.graphics.drawable;

// avoid cond redidunsy between item and bar
export function createIconsStateListDrawable(icon: string, checkedIcon?: string): StateListDrawableType {
    const statesListIconDrawable = new StateListDrawable();

    const defaultIconState = Array.create('int', 1);
    defaultIconState[0] = -android.R.attr.state_checked;

    statesListIconDrawable.addState(
        defaultIconState,
        new BitmapDrawable(imageConverter(icon).android)
    );

    if (checkedIcon) {
        const iconCheckedState = Array.create('int', 1);
        iconCheckedState[0] = android.R.attr.state_checked;

        statesListIconDrawable.addState(
            iconCheckedState,
            new BitmapDrawable(imageConverter(checkedIcon).android)
        );

    }

    return statesListIconDrawable;
}