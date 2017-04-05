import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { registerElement } from 'nativescript-angular';
import { BottomBarItem } from 'nativescript-bottombar';

registerElement('BottomBar', () => require('nativescript-bottombar').BottomBar);
registerElement('BottomBarItem', () => require('nativescript-bottombar').BottomBarItem);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {

    @ViewChild('bar') bar: ElementRef;
    public selectedIndex: number;
    public hidden: boolean;
    public notification: any;

    public items: Array<BottomBarItem> = [
        new BottomBarItem(0, "Home", "ic_home_black_24dp", "#1083BF", "lol"),
        new BottomBarItem(1, "Calendar", "ic_calendar", "#1083BF", "mdr"),
        new BottomBarItem(2, "Profile", "ic_collaborator", "#1083BF", "lmao"),
        new BottomBarItem(3, "Message", "ic_paperplane", "#1083BF", "xD")
    ];
    /*public items: Array<any> = [
        {
            title: 'Home',
            icon: 'ic_home_black_24dp',
            color: '#1083BF',
            notification: "3"
        },
        {
            title: 'Calendar', // Your title
            icon: 'ic_calendar', // Your path to icon (App_Ressources > drawables, should be 24dp)
            color: '#1083BF' // Hexa color of the BottomBar when item active
        },
        {
            title: 'Profile',
            icon: 'ic_collaborator',
            color: '#1083BF'
        },
        {
            title: 'Message',
            icon: 'ic_paperplane',
            color: '#1083BF'
        }
    ];*/
    constructor() {
        this.notification = "1";
        this.selectedIndex = 0;
        this.hidden = false;
        var _that = this;
        this.items[0].icon = "ic_calendar";
        this.items[0].color = "black";
        setTimeout(function () {
            _that.hidden = true;

            setTimeout(function () {
                _that.hidden = false;
                let itemsTemp = _that.items;
                /*itemsTemp[0] = {
                    title: 'Home',
                    icon: 'ic_home_black_24dp',
                    color: '#1083BF',
                    notification: "2"
                };*/
                //_that.items[0].notification = "2";

            }, 2000);
        }, 3000);
    }

    ngOnInit(): void {
        let _that = this;
        setTimeout(function () {
            _that.items[0].notification = "";
            _that.items[0].notification = "2";
        }, 2000);
    }
    tabSelected(args) {
        if (args.newIndex !== args.oldIndex) {
            console.log(args.newIndex);
            this.selectedIndex = args.newIndex;
        }
    }
}
