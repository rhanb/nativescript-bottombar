import { EventData } from 'tns-core-modules/ui/core/view/view';

export interface TabSelectedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}

// https://developer.android.com/reference/com/google/android/material/bottomnavigation/LabelVisibilityMode.html#LABEL_VISIBILITY_AUTO
export enum LABEL_VISIBILITY {
    AUTO = -1,
    LABELED = 1,
    SELECTED = 0,
    UNLABELED = 2
}