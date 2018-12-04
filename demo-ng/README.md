# Nativescript Bottombar usage with Angular

### Module
```typescript
import { BottomBarModule } from 'nativescript-bottombar/angular';

@NgModule({
    bootstrap: [
        ...
    ],
    imports: [
        ...
        BottomBarModule
    ],
    declarations: [
        ...
    ]
})
```

### XML
   
```xml
<GridLayout rows="*, auto">
    <StackLayout row="0" orientation="vertical">
       <Label text="demo"></Label>
    </StackLayout>
    <BottomBar row="1"
        (tabSelected)="tabSelected($event)"
        [androidLabelVisibility]="labelVisibility"
        (loaded)="barLoaded($event)">
        <BottomBarItem
            badgeBackgroundColor="#FF0C3E"
            badge="1"
            icon="res://ic_home_outline"
            title="Home 1" checkedIcon="res://ic_home_filled">
        </BottomBarItem>
        <BottomBarItem
            badgeBackgroundColor="#FF0C3E"
            icon="res://ic_home_outline"
            badge="2"
            title="Home 2"
            checkedIcon="res://ic_home_filled">
        </BottomBarItem>
        <BottomBarItem
            badgeBackgroundColor="#FF0C3E"
            icon="res://ic_home_outline"
            badge="3"
            title="Home 3"
            checkedIcon="res://ic_home_filled">
        </BottomBarItem>
    </BottomBar>
</GridLayout>
```
### Component

```typescript
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
```

## Common Usage

### Icons

The properties `icon` and `checkedIcon` supports the following path formats:

- `~/`: relative path to the app folder
- `res://`: icons must be in the App_Resources folder as follow


|                     iOS                     | Android                                             |
|:-------------------------------------------:|-----------------------------------------------------|
| ![iOS](/src/screenshots/ressources.ios.png) | ![Android](/src/screenshots/ressources.android.png) |

### Ripple effect color on Android

To change the color of the ripple effect when an item is tapped, please add the following item to your `AppTheme` inside your `App_Resources` > `Android` > `src` > `main` > `res` > `values` > `styles.xml` file with the desired `color` resource.

```XML
<!-- Application theme -->
<style name="AppTheme" parent="AppThemeBase">
    <item name="colorControlHighlight">@color/ns_accent</item>
</style>
```

## More details

[API documentation](/API_DOCUMENTATION.md)