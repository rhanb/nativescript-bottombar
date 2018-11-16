import { Component } from "@angular/core";
import { registerElement } from 'nativescript-angular';
import { BottomBar, BottomBarItemBase } from 'nativescript-bottombar';

registerElement('BottomBar', () => BottomBar);

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html",
    styles: [`
        BottomBar {
            inactive-tint-color: #5CB85C;
            active-tint-color: #022733;
            bar-background-color: #F8FAFD;
        }
    `]
})
export class AppComponent {

    labelVisibility: number = 2;
    bottomBarItems: BottomBarItemBase[];
    // inactiveTintColor = '#5CB85C';
    // activeTintColor = '#022733';
    // barBackgroundColor = '#F8FAFD';

    constructor() {
        this.bottomBarItems = [{
            icon: 'ic_home_black_24dp',
            title: 'Home 1'
        }, {
            icon: 'ic_home_black_24dp',
            title: 'Home 1'
        }, {
            icon: 'ic_home_black_24dp',
            title: 'Home 1'
        }, {
            icon: 'ic_home_black_24dp',
            title: 'Home 1'
        }];
    }

    tabSelected(event) {
        console.dir(event);
    }
}
