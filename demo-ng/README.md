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
    <BottomBar row="1" (tabSelected)="tabSelected($event)">
        <BottomBarItem icon="ic_home_black_24dp" title="Home"></BottomBarItem>
        <BottomBarItem icon="ic_calendar" title="Calendar"></BottomBarItem>
        <BottomBarItem icon="ic_collaborator" title="Profile"></BottomBarItem>
        <BottomBarItem icon="ic_paperplane" title="Messages"></BottomBarItem>
    </BottomBar>
</GridLayout>
```
### Component

```typescript
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
            inactive-tint-color: #C34491;
            active-tint-color: #FFFFFF;
            bar-background-color: #9F489B;
        }
    `]
})
export class AppComponent {
    tabSelected(event) {
        console.dir(event);
    }
}
```

## Common Usage

### Icons

The properties `icon` and `checkedIcon` supports the following path formats:

- `~/`: relative path to the app folder
- `res://`: icons must be in the App_Resources folder as follow


  iOS    |  Android
-------- | ---------
![iOS](/src/screenshots/ressources.ios.png) | ![Android](/src/screenshots/ressources.android.png)

### Ripple effect color on Android

To change the color of the ripple effect when an item is tapped, please add the following item to your `AppTheme` inside your `App_Resources` > `Android` > `src` > `main` > `res` > `values` > `styles.xml` file with the desired `color` resource.

```XML
<!-- Application theme -->
<style name="AppTheme" parent="AppThemeBase">
    <item name="colorControlHighlight">@color/ns_accent</item>
</style>
```

## More details

[API documentation](https://github.com/rhanbIT/nativescript-bottombar/blob/master/API.md)