import { EventData, Observable } from 'data/observable';
import { HelloWorldModel } from './main-view-model';
import { Page } from 'ui/page';
import { Color } from "color";
import * as imageSource from "image-source";

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: EventData) {
    // Get the event sender
    var page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();
}

export function tabSelected(args) {
    console.log(args.eventName + ' ' + args.oldIndex + ' ' + args.newIndex)
}
