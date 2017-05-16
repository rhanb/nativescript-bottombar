import { Component } from "@angular/core";
import { registerElement } from 'nativescript-angular';
import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData, Notification } from 'nativescript-bottombar';

registerElement('BottomBar', () => BottomBar);

@Component({
    selector: "nsapp",
    templateUrl: "app.component.html",
})

export class AppComponent {
    public hidden: boolean;
    public titleState: TITLE_STATE;
    public _bar: BottomBar;
    public inactiveColor: string;
    public accentColor: string;

    public items: Array<BottomBarItem> = [
        new BottomBarItem(0, "Home", "ic_home_black_24dp", "black", new Notification("blue", "white", "1")),
        new BottomBarItem(1, "Calendar", "ic_calendar", "#1083BF", new Notification("green", "blue", "1")),
        new BottomBarItem(2, "Profile", "ic_collaborator", "pink", new Notification("pink", "yellow", "1")),
        new BottomBarItem(3, "Message", "ic_paperplane", "green", new Notification("green", "red", "1"))
    ];
    constructor() {
        this.hidden = false;
        this.titleState = TITLE_STATE.SHOW_WHEN_ACTIVE;
        this.inactiveColor = "white";
        this.accentColor = "blue";
    }

    tabSelected(args: SelectedIndexChangedEventData) {
        console.log(args.newIndex);
        if (args.newIndex !== args.oldIndex) {
            this._bar.setNotification("", args.newIndex);
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
        console.log('tabLoaded');
    }
    selectItem() {
        this._bar.selectItem(0);
    }

    getCurrentIndex() {
        console.log(this._bar.selectedIndex);
    }
}