import { Component } from "@angular/core";
import { BottomBar } from 'nativescript-bottombar';

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html",
    styles: [`
        BottomBar {
            inactive-tint-color: #C34491;
            active-tint-color: #FFFFFF;
            bar-background-color: #9F489B;
            badge-background-color: #222222;
        }

        BottomBarItem {
            badge-background-color: #222222;
        }
    `]
})
export class AppComponent {
    private bottomBar: BottomBar;

    home: string = 'Home bis';

    badgeValue: string = '1';

    tabSelected(event) {
        console.dir(event);
    }

    barLoaded(event) {
        this.bottomBar = event.object;
    }
}
