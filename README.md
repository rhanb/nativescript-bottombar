# NativeScript Bottom Navigation

NativeScript plugin for AHBottomNavigation.
https://github.com/aurelhubert/ahbottomnavigation

## Install

tns plugin add nativescript-bottomnavigation

## Usage

```xml
...
xmlns:bottomnav="nativescript-bottomnavigation"
...

<bottomnav:BottomNavigation tabSelected="tabSelected">
  <bottomnav:BottomNavigation.items>
    <bottomnav:BottomNavigationItem title="Cake" icon="ic_cake_white_24dp" color="#4CAF50" />
    <bottomnav:BottomNavigationItem title="Favorites" icon="ic_favorite_white_24dp" color="#2196F3" />
    <bottomnav:BottomNavigationItem title="Settings" icon="ic_settings_white_24dp" color="#FF4081" />
  </bottomnav:BottomNavigation.items>
</bottomnav:BottomNavigation>
```
