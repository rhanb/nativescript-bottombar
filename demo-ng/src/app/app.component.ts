import { Component } from "@angular/core";
import { registerElement } from 'nativescript-angular';
import { BottomBar } from 'nativescript-bottombar';

registerElement('BottomBar', () => BottomBar);

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html",
    styles: [`
        BottomBar {
            inactive-tint-color: #4062FA;
            active-tint-color: #022733;
            bar-background-color: #F8FAFD;
        }
    `]
})
export class AppComponent { 
    constructor() {
        console.log('app comonent working');
    }
}
