import { Component } from "@angular/core";
import { BottomBar } from 'nativescript-bottombar';
import { registerElement } from 'nativescript-angular';

registerElement('BottomBar', () => BottomBar);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public selectedIndex: number;
    public hidden: boolean;
    constructor() {
        this.selectedIndex = 0;
        this.hidden = false;
        var _that = this;
        setTimeout(function (){
            _that.hidden = true;
            console.log('hidden');
        }, 3000);
    }
    public items: Array<any> = [
        {
            title: 'Home',
            icon: 'ic_home_black_24dp',
            color: '#1083BF'
        },
        {
            title: 'Calendar', // Your title
            icon: 'ic_calendar', // Your path to icon (App_Ressources > drawables, should be 24dp)
            color: '#1083BF' // Hexa color of the BottomBar when item active
        },
        {
            title: 'Profile',
            icon: 'ic_collaborator',
            color: '#1083BF'
        },
        {
            title: 'Message',
            icon: 'ic_paperplane',
            color: '#1083BF'
        }
    ];
    tabSelected(args) {
        if (args.newIndex !== args.oldIndex) {
            console.log(args.newIndex);
            this.selectedIndex = args.newIndex;
        }
    }
}
