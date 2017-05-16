[![npm](https://img.shields.io/npm/v/nativescript-bottombar.svg)](https://www.npmjs.com/package/nativescript-bottombar)
[![npm](https://img.shields.io/npm/dt/nativescript-bottombar.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-bottombar)

# NativeScript BottomBar :beers::fire::fr:

NativeScript plugin for [AHBottomNavigation](https://github.com/aurelhubert/ahbottomnavigation) and [MiniTabBar](https://github.com/D-32/MiniTabBar).

Checkout [demo](https://github.com/rhanbIT/nativescript-bottombar/blob/master/DEMO.md).

## Installation

- 2.x: `tns plugin add nativescript-bottombar@^2.1`

- 3.x: `tns plugin add nativescript-bottombar`

# Usage

[API documentation](https://github.com/rhanbIT/nativescript-bottombar/blob/master/API.md)

## Angular NativeScript

### XML
   
```xml
<GridLayout rows="*, auto">
    <Label row="0" text="test"></Label>
    <GridLayout row="1">
        <BottomBar row="1" [items]="items" (tabSelected)="tabSelected($event)" [hide]="hidden" titleState="{{titleState}}" (loaded)="bottomBarLoaded()"></BottomBar>
    </GridLayout>
</GridLayout>
```
### Component

```typescript
import { Component } from "@angular/core";
import { registerElement } from 'nativescript-angular';
import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData } from 'nativescript-bottombar';

registerElement('BottomBar', () => BottomBar);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})
export class AppComponent  {

    public selectedIndex: number;
    public hidden: boolean;
    public titleState: TITLE_STATE;

    public items: Array<BottomBarItem> = [
        new BottomBarItem(0, "Home", "ic_home_black_24dp", "black", "lol"),
        new BottomBarItem(1, "Calendar", "ic_calendar", "#1083BF", "mdr"),
        new BottomBarItem(2, "Profile", "ic_collaborator", "pink", "lmao"),
        new BottomBarItem(3, "Message", "ic_paperplane", "green", "xD")
    ];
    constructor() {
        this.selectedIndex = 0;
        this.hidden = false;
        this.titleState = TITLE_STATE.SHOW_WHEN_ACTIVE;
    }
    
    tabSelected(args: SelectedIndexChangedEventData) {
        if (args.newIndex !== args.oldIndex) {
            console.log(args.newIndex);
            this.selectedIndex = args.newIndex;
            this.items[this.selectedIndex].notification = "1";
        }
    }
    bottomBarLoaded() {
        console.log('bottomBarLoaded');
    }
}
```
# Ressources

Don't forget that you need your icons files to be in your ressources folder as follow:

<img src="https://raw.githubusercontent.com/rhanbIT/nativescript-bottombar/master/screenshots/ressources.png" width="250" height="368" />

[API documentation](https://github.com/rhanbIT/nativescript-bottombar/blob/master/API.md)
