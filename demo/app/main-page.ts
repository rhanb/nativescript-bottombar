import { EventData, Observable } from 'data/observable';
import { HelloWorldModel } from './main-view-model';
import { Page } from 'ui/page';
import { Color } from "color";
import * as imageSource from "image-source";

var page: Page;

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: EventData) {
    // Get the event sender
    page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();
    console.log('itemsProperty');
}

export function tabSelected(args) {
    console.log(args.eventName + ' ' + args.oldIndex + ' ' + args.newIndex)
    page.bindingContext.set('message', `Tab ${args.newIndex} selected`)
}
