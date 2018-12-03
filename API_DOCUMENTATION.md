# Summary 

1. [BottomBar](#bottombar)
2. [BottomBarItem](#bottombaritem)
3. [LABEL_VISIBILITY](#label_visibility)


* *properties (bindable) = properties settable threw XML*
* *properties (internal) = properties settable threw JS/TS instance*

# BottomBar

### Properties (bindables)
  
| Name          	| Description                                                                 	| Required 	| Type                   	| Default                  	| Android 	| iOS    	|
|---------------	|-----------------------------------------------------------------------------	|----------	|------------------------	|--------------------------	|---------	|--------	|
| items         	| *`Array` containing the items of the bottombar. Can be set with `XML`.*                                	| `false`   	| `Array<BottomBarItem>` 	| `Array<BottomBarItem>()` 	| `true`  	| `true` 	|
| barBackgroundColor   	| *`CSS Property` allowing to set the background color of the BottomBar. Can be set with CSS: `bar-background-color`.*    	| `false`  	| `Color`               	| `white`                  	| `true`  	| `true` 	|
| activeTintColor 	| *`CSS Property` allowing to set the color of a  selected BottomBarItem's icon. Can be set with CSS: `active-tint-color`* 	| `false`  	| `String`               	| `black`                	| `true`  	| `true` 	|
| inactiveTintColor       	| *`CSS Property` allowing to set the color of a unselected BottomBarItem's icon. Can be set with CSS: `inactive-tint-color`*                      	| `false`  	| `Boolean`              	| `true`                   	| `true`  	| `true` 	|
| androidLabelVisibility    	| *`Property` allowing to have three different `BottomNavigationView` display.*           	| `false`  	| `LABEL_VISIBILITY`          	| `SELECTED`       	| `true`  	| `false` 	|
    
### Properties (internal)
 
|      Name     | Description                 | Required | Type   | Default | Android | iOS  |
|:-------------:|-----------------------------|----------|--------|---------|---------|------|
| selectedIndex | *Index of the selected item.* | `true`     | `number` | `0`       | `true`    | `true` |

### Mehods
 
|            Name           | Description                                   | Type                    | Android | iOS  |
|:-------------------------:|-----------------------------------------------|-------------------------|---------|------|
| selectItem(index: number) | *Select an item programmatically by its index.* | `(index: number) => void` | `true`    | `true` |

 
# BottomBarItem

### Properties (bindables)
|         Name         | Description                                                                                                                                                                                                           | Required | Type     | Default     | Android | iOS    |
|:--------------------:|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|----------|-------------|---------|--------|
| icon                 | Path to the `image`. (Example: `res://ic_home_outline`)                                                                                                                                                               | `true`   | `string` | `undefined` | `true`  | `true` |
| checkedIcon          | Path to the `image`. If set, the icon of the item will change depending of its state. If it's selected, the `checkedIcon` will be displayed otherwise the `icon` will be displayed. (Example: `res://ic_home_filled`) | `false`  | `string` | `undefined` | `true`  | `true` |
| title                | Text displayed below the `icon`.                                                                                                                                                                                      | `true`   | `string` | `undefined` | `true`  | `true` |
| badge                | Value displayed above the `icon`. If `null` the badge will not be displayed.                                                                                                                                          | `false`  | `string` | `undefined` | `true`  | `true` |
| badgeBackgroundColor | Badge background color.                                                                                                                                                                                               | `false`  | `string` | `undefined` | `true`  | `true` |

# LABEL_VISIBILITY

### Enum

| Name | Value |
| ---- | ----- |
| AUTO | -1 |
| LABELED | 1 |
| SELECTED | 0 |
| UNLABELED | 2 |

[More informations here](https://developer.android.com/reference/com/google/android/material/bottomnavigation/LabelVisibilityMode.html#LABEL_VISIBILITY_AUTO)