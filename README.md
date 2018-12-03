[![npm](https://img.shields.io/npm/v/nativescript-bottombar.svg)](https://www.npmjs.com/package/nativescript-bottombar)
[![npm](https://img.shields.io/npm/dt/nativescript-bottombar.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-bottombar)
[![twitter: @_rhanb](https://img.shields.io/badge/twitter-%40rhanb-2F98C1.svg)](https://twitter.com/_rhanb)
[![Build Status](https://travis-ci.org/rhanb/nativescript-bottombar.svg?branch=4.0-rc)](https://travis-ci.org/rhanb/nativescript-bottombar)

[![NPM](https://nodei.co/npm/nativescript-bottombar.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/nativescript-bottombar/)

# NativeScript BottomBar :beers::fire::fr:


NativeScript plugin for [BottomNavigationView](https://github.com/aurelhubert/ahbottomnavigation) and [UITabBar](https://developer.apple.com/documentation/uikit/uitabbar).

PS: To have a material design on iOS too, free to use the plugin [nativescript-bottom-navigation](https://github.com/henrychavez/nativescript-bottom-navigation/)

No third libraries are used in this plugin, wich means this plugin is lightweight because only javascript files will be added to your app.

 iOS    |  Android
-------- | ---------
![iOS](screenshots/showcase-ios.gif) | ![Android](https://github.com/rhanb/nativescript-bottombar/blob/master/screenshots/showcase-android.png)

## Installation

`tns plugin add nativescript-bottombar`

## Usage

- [Angular](/demo-ng/README.md)
- [Vue](/demo-vue/README.md)
- [{N} core](/demo/README.md)

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

### TODO

- [ ] Allow to hide/show the `BottomBar`
- [ ] Expose more `BottomBarItem` customisation (font, position, etc..)
- [ ] Expose selection indicator on `iOS`
- [ ] Implement more `unit` tests and `e2e` tests
