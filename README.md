[![npm](https://img.shields.io/npm/v/nativescript-bottombar.svg)](https://www.npmjs.com/package/nativescript-bottombar)
[![npm](https://img.shields.io/npm/dt/nativescript-bottombar.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-bottombar)

# NativeScript BottomBar

NativeScript plugin for AHBottomNavigation.
https://github.com/aurelhubert/ahbottomnavigation

Only for Android, for now? :smile:

iOS support is currently under developpment:

### TODO

- [x] Hide/Show animation
- [x] Badges system
- [ ] Badge color customisation
- [ ] Badge font size
- [x] Title state implementation
- [ ] title font color customisation
- [ ] inactive icon color customisation
- [ ] Change tab color when selected tab item color is different 


## Demo

<img src="https://github.com/rhanbIT/nativescript-bottombar/blob/master/screenshots/showcase.gif" width="416" height="736" /> 

## Install (Under active developpment)
```bash
tns plugin add nativescript-bottombar
```

# Usage



## Vanilla NativeScript



### XML

IMPORTANT: Make sure you include ``xmlns:btn:"nativescript-bottombar"`` on the Page element

```xml
...
xmlns:btn="nativescript-bottombar"
...

<btn:BottomBar tabSelected="tabSelected" titleState="{{ titleStateValue }}" hide="{{ hidden}}" > 
  <btn:BottomBar.items>
    <btn:BottomBarItem title="Cake" icon="ic_cake_white_24dp" color="#4CAF50" />
    <btn:BottomBarItem title="Favorites" icon="ic_favorite_white_24dp" color="#2196F3" />
    <btn:BottomBarItem title="Settings" icon="ic_settings_white_24dp" color="#FF4081" />
  </btn:BottomBar.items>
</btn:BottomBar>
```

### TypeScript 

```typescript
export function pageLoaded(args: EventData) {
    // Get the event sender
    page = <Page>args.object;
    page.bindingContext = new HelloWorldModel();
}

export function tabSelected(args) {
    console.log(args.eventName + ' ' + args.oldIndex + ' ' + args.newIndex)
    page.bindingContext.set('message', `Tab ${args.newIndex} selected`)
}
```

```typescript
import {Observable} from 'data/observable';
import {TITLE_STATE} from 'nativescript-bottombar/bottombar.common';

export class HelloWorldModel extends Observable {
  public message: string;
  public titleStateValue: TITLE_STATE
  public hidden: boolean;
  constructor() {
    super();
    this.titleStateValue = TITLE_STATE.SHOW_WHEN_ACTIVE;
    this.hidden = false;
  }
}
```
## Angular NativeScript

!!! If you want to change items color, title.. you'll have to wait for the BottomBar to be loaded !!!

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
