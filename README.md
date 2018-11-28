[![npm](https://img.shields.io/npm/v/nativescript-bottombar.svg)](https://www.npmjs.com/package/nativescript-bottombar)
[![npm](https://img.shields.io/npm/dt/nativescript-bottombar.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-bottombar)
[![twitter: @_rhanb](https://img.shields.io/badge/twitter-%40rhanb-2F98C1.svg)](https://twitter.com/_rhanb)
[![Build Status](https://travis-ci.org/rhanb/nativescript-bottombar.svg?branch=4.0-rc)](https://travis-ci.org/rhanb/nativescript-bottombar)

[![NPM](https://nodei.co/npm/nativescript-bottombar.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nativescript-bottombar/)

# NativeScript BottomBar :beers::fire::fr:


NativeScript plugin for [BottomNavigationView](https://github.com/aurelhubert/ahbottomnavigation) and [UITabBar](https://developer.apple.com/documentation/uikit/uitabbar).

No third libraries are used in this plugin.

 iOS    |  Android
-------- | ---------
![iOS](screenshots/showcase-ios.gif) | ![Android](https://github.com/rhanb/nativescript-bottombar/blob/master/screenshots/showcase-android.png)

## Installation

`tns plugin add nativescript-bottombar`

# Usage

- [Angular](/demo-ng/README.md)
- [Vue](/demo-vue/README.md)
- [{N} core](/demo/README.md)

## Angular NativeScript

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
## TypeScript NativeScript

### XML

```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd" loaded="pageLoaded" class="page"
  xmlns:ui="nativescript-bottombar">
  <GridLayout rows="*, 40px" class="page">
    <StackLayout row="0" orientation="vertical">
        <Label text="demo"></Label>
    </StackLayout>
    <ui:BottomBar row="1">
        <ui:BottomBarItem icon="ic_home_black_24dp" title="Home"></ui:BottomBarItem>
        <ui:BottomBarItem icon="ic_calendar" title="Calendar"></ui:BottomBarItem>
        <ui:BottomBarItem icon="ic_collaborator" title="Profile"></ui:BottomBarItem>
		<ui:BottomBarItem icon="ic_paperplane" title="Messages"></ui:BottomBarItem>
    </ui:BottomBar>
</GridLayout>
</Page>
```

### Model

```typescript
import { Observable } from 'data/observable';
import { BottomBar, BottomBarItem, TITLE_STATE, SelectedIndexChangedEventData, Notification } from 'nativescript-bottombar';

export class HomeViewModel extends Observable {

}
```

# Ressources

Don't forget that you need your icons files to be in your ressources folder as follow:


  iOS    |  Android
-------- | ---------
![iOS](screenshots/ressources.ios.png) | ![Android](screenshots/ressources.android.png)

[API documentation](https://github.com/rhanbIT/nativescript-bottombar/blob/master/API.md)
