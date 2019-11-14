import { EventData } from 'tns-core-modules/ui/core/view/view';
export interface TabSelectedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}
export declare enum LABEL_VISIBILITY {
    AUTO = -1,
    LABELED = 1,
    SELECTED = 0,
    UNLABELED = 2
}
