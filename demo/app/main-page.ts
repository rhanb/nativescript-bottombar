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

    let bar = new com.aurelhubert.ahbottomnavigation.AHBottomNavigation(args.context);
    console.log(bar);

    let icon1 = new BitmapDrawable(imageSource.fromResource('ic_cake_white_24dp').android);
    let icon2 = new BitmapDrawable(imageSource.fromResource('ic_favorite_white_24dp').android);
    let icon3 = new BitmapDrawable(imageSource.fromResource('ic_settings_white_24dp').android);


    let item = new AHBottomNavigationItem('Cake', icon1, new Color('#4CAF50').android);
    let item2 = new AHBottomNavigationItem('Favorites', icon2, new Color('#2196F3').android);
    let item3 = new AHBottomNavigationItem('Settings', icon3, new Color('#FF4081').android);

    // Add items        
    bar.addItem(item);
    bar.addItem(item2);
    bar.addItem(item3);


    // Force to tint the drawable (useful for font with icon for example)
    bar.setForceTint(true);


    // Set background color
    bar.setDefaultBackgroundColor(new Color('#3489db').android);


    // Use colored navigation with circle reveal effect
    bar.setColored(true);


    bar.setNotification("4", 1);


    args.view = bar;
}