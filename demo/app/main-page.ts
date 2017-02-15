import { EventData, Observable } from 'data/observable';
import { HelloWorldModel } from './main-view-model';
import { Page } from 'ui/page';
import { Color } from "color";
import * as imageSource from "image-source";
import {BottomBar, BottomBarItem} from 'nativescript-bottombar';

var page: Page;

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args: EventData) {
    // Get the event sender
    page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();
    /*console.dir(BottomBar);
    console.dir(BottomBarItem);
    console.log('itemsProperty');
    console.dir(BottomBar.itemsProperty);
    console.log("selectedIndexProperty");
    console.dir(BottomBar.selectedIndexProperty);
    console.log('tabSelectedEvent');
    console.dir(BottomBar.tabSelectedEvent);
    console.dir(BottomBarItem);*/
}

export function tabSelected(args) {
    console.log(args.eventName + ' ' + args.oldIndex + ' ' + args.newIndex)
    page.bindingContext.set('message', `Tab ${args.newIndex} selected`)
}
