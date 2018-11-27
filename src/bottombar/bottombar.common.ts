import { EventData } from 'tns-core-modules/ui/core/view/view';

export interface TabSelectedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}
