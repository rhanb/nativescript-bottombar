# Nativescript Bottombar usage with Typescript

### XML

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded" class="page"
  xmlns:ui="nativescript-bottombar">
  <GridLayout rows="*, auto" class="page">
        <StackLayout row="0" orientation="vertical">
            <Label text="demo"></Label>
        </StackLayout>
        <ui:BottomBar row="1"
            automationText="bottomBar"
            loaded="{{ bottomBarLoaded($event) }}"
            tabSelected="{{ bottomBarItemSelected($event) }}">
            <ui:BottomBarItem
                badgeBackgroundColor="green"
                badge="1"
                icon="res://ic_home_outline"
                title="Home 1"
                checkedIcon="res://ic_home_filled">
            </ui:BottomBarItem>
            <ui:BottomBarItem
                icon="res://ic_home_outline"
                badge="2"
                title="Home 2"
                checkedIcon="res://ic_home_filled">
            </ui:BottomBarItem>
            <ui:BottomBarItem
                icon="res://ic_home_outline"
                badge="3"
                title="Home 3"
                checkedIcon="res://ic_home_filled">
            </ui:BottomBarItem>
        </ui:BottomBar>
    </GridLayout>
</Page>
```

### Model

```typescript
import { TabSelectedEventData, BottomBar } from 'nativescript-bottombar';

export class HelloWorldModel extends Observable {
  private _bottomBar: BottomBar;

  constructor() {
    super();
  }

  public bottomBarLoaded(event) {
    console.dir(event);
    this._bottomBar = event.object;
  }

  bottomBarItemSelected(event: TabSelectedEventData) {
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