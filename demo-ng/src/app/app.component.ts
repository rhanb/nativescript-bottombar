import { Component } from "@angular/core";
import { registerElement } from 'nativescript-angular';
import { BottomBar, BottomBarItem } from 'nativescript-bottombar';

registerElement('BottomBar', () => BottomBar);
registerElement('BottomBarItem', () => BottomBarItem);

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
        // this.home = 'Home ter';
        setTimeout(() => {
                this.badgeValue = '';
                console.log('title changed');
                setTimeout(() => {
                    this.badgeValue = '6';
                    console.log('title changed');
            }, 1000);
        }, 1000);
        // // setTimeout(() => {
        // //     console.log('hidding');
        // //     this.bottomBar.hide();
        // //     setTimeout(() => {
        // //         console.log('showing');
        // //         this.bottomBar.show();
        // //     }, 1000)
        // // }, 1000);
    }
}
