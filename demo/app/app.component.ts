import { Component } from "@angular/core";
import {Tabbar} from 'nativescript-bottombar';
import { registerElement } from 'nativescript-angular';

registerElement('Tabbar', () => Tabbar);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
        _tabbar: Tabbar; 
        currentInc: number = 0;

    tabLoaded(event) {
        this._tabbar = <Tabbar>event.object;
        console.log("tabLoaded");
    }

    changeBadge() {
        this._tabbar.setBadge(this.currentInc, "5");
        this.currentInc++;
    }
    hideBadge() {
        this._tabbar.setBadge(0, "");
    }
}

