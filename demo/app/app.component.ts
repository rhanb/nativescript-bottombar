import { Component } from "@angular/core";
import { registerElement } from 'nativescript-angular';
import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData } from 'nativescript-bottombar';

registerElement('BottomBar', () => BottomBar);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent  {

    public selectedIndex: number;
    public hidden: boolean;
    public titleState: TITLE_STATE;

    public items: Array<BottomBarItem> = [
        new BottomBarItem(0, "Home", "ic_home_black_24dp", "black", "lol"),
        new BottomBarItem(1, "Calendar", "ic_calendar", "#1083BF", "mdr"),
        new BottomBarItem(2, "Profile", "ic_collaborator", "pink", "lmao"),
        new BottomBarItem(3, "Message", "ic_paperplane", "green", "xD")
    ];
    constructor() {
        this.selectedIndex = 0;
        this.hidden = false;
        this.titleState = TITLE_STATE.SHOW_WHEN_ACTIVE;
    }

    tabSelected(args: SelectedIndexChangedEventData) {
        if (args.newIndex !== args.oldIndex) {
            console.log(args.newIndex);
            this.selectedIndex = args.newIndex;
            this.items[this.selectedIndex].notification = "1";
        }
    }
    hideBottombar() {
        this.hidden = true;
    }

    showBottombar() {
        this.hidden = false;
    }

    changeIcon () {
        console.log(this.selectedIndex);
        this.items[this.selectedIndex].icon = "ic_paperplane";
    }

    changeColor () {
        console.log(this.selectedIndex);
        this.items[this.selectedIndex].color = "black";
    }

    changeTitle() {
        this.items[this.selectedIndex].title = "Test";
    }
}
