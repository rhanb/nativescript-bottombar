import { Component } from "@angular/core";
import { registerElement } from 'nativescript-angular';
import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData } from 'nativescript-bottombar';

registerElement('BottomBar', () => BottomBar);

@Component({
    selector: "nsapp",
    templateUrl: "app.component.html",
})

export class AppComponent {
    currentInc: number = 0;

 public hidden: boolean;
    public titleState: TITLE_STATE;

    public items: Array<BottomBarItem> = [
        new BottomBarItem(0, "Home", "ic_home_black_24dp", "black", "1"),
        new BottomBarItem(1, "Calendar", "ic_calendar", "#1083BF", "2"),
        new BottomBarItem(2, "Profile", "ic_collaborator", "pink", "3"),
        new BottomBarItem(3, "Message", "ic_paperplane", "green", "4")
    ];
    constructor() {
        this.hidden = false;
        this.titleState = TITLE_STATE.SHOW_WHEN_ACTIVE;
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

        console.log("tabLoaded");
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