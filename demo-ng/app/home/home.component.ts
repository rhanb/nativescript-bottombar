import { Component } from "@angular/core";
import { registerElement } from 'nativescript-angular';
import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData, Notification } from 'nativescript-bottombar';

registerElement('BottomBar', () => BottomBar);

@Component({
    moduleId: module.id,
    templateUrl: "./home.component.html",
})
export class HomeComponent {
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

    constructor() {}

    tabLoaded(event) {
        console.log("barLoaded");
        this._bar = <BottomBar>event.object;
        this.hidden = false;
        this.titleState = TITLE_STATE.SHOW_WHEN_ACTIVE;
        this.inactiveColor = "red";
        this.accentColor = "deepskyblue";
    }

    tabSelected(args: SelectedIndexChangedEventData) {
        // only triggered when a different tab is tapped
        console.log(args.newIndex);
    }
}
