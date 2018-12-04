import { Component } from "@angular/core";
import { BottomBar, LABEL_VISIBILITY, TabSelectedEventData } from 'nativescript-bottombar';

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html",
    styles: [`
        BottomBar {
            inactive-tint-color: #B98AF9;
            active-tint-color: #FFFFFF;
            bar-background-color: #6800F4;
        }
    `]
})
export class AppComponent {
    private bottomBar: BottomBar;
    labelVisibility: LABEL_VISIBILITY;

    constructor() {
        this.labelVisibility = LABEL_VISIBILITY.SELECTED;
    }

    tabSelected(event: TabSelectedEventData) {
        console.dir(event);
    }

    barLoaded(event) {
        this.bottomBar = event.object;
    }
}
