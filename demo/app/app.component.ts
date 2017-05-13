import { Component } from "@angular/core";
import { registerElement } from 'nativescript-angular';
import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData, Notification } from 'nativescript-bottombar';

registerElement('BottomBar', () => BottomBar);

@Component({
    selector: "nsapp",
    templateUrl: "app.component.html",
})

export class AppComponent {
    currentInc: number = 0;

    public hidden: boolean;
    public titleState: TITLE_STATE;
    public _bar: BottomBar;

    public items: Array<BottomBarItem> = [
        new BottomBarItem(0, "Home", "ic_home_black_24dp", "black", new Notification("blue", "white", "1")),
        new BottomBarItem(1, "Calendar", "ic_calendar", "#1083BF", new Notification("green", "blue", "1")),
        new BottomBarItem(2, "Profile", "ic_collaborator", "pink", new Notification("pink", "yellow", "1")),
        new BottomBarItem(3, "Message", "ic_paperplane", "green", new Notification("green", "red", ""))
    ];
    constructor() {
        this.hidden = false;
        this.titleState = TITLE_STATE.ALWAYS_SHOW;
    }

    tabSelected(args: SelectedIndexChangedEventData) {
        if (args.newIndex !== args.oldIndex) {
            console.log(args.newIndex);
            this.items[args.newIndex].notification = "";
        }
    }
    hideBottombar() {
        this.hidden = true;
    }

    showBottombar() {
        this.hidden = false;
    }
    tabLoaded(event) {
        this._bar = <BottomBar>event.object
    }

    changeIcon() {
        /*    console.log(this.selectedIndex);
            this.items[this.selectedIndex].icon = "ic_paperplane";*/
    }


    changeColor() {
        // console.log(this.selectedIndex);
        // this.items[this.selectedIndex].color = "black";
    }

    changeTitle() {
        // this.items[this.selectedIndex].title = "Test";
    }
}