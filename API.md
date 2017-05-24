# Summary 

1. [BottomBar](#bottombar)
2. [TitleState](#titlestate)
3. [BottomBarItem](#bottombaritem)
3. [Notification](#notification)


* *properties (bindable) = properties settable threw XML*
* *properties (internal) = properties settable threw JS/TS instance*

# BottomBar

  ## Properties (bindables)
  
| Name          	| Description                                                                 	| Required 	| Type                   	| Default                  	| Android 	| iOS    	|
|---------------	|-----------------------------------------------------------------------------	|----------	|------------------------	|--------------------------	|---------	|--------	|
| items         	| *Array containing the items of the bottombar.*                                	| `true`   	| `Array<BottomBarItem>` 	| `Array<BottomBarItem>()` 	| `true`  	| `true` 	|
| titleState    	| *Enum property allowing to have three different BottomBar display.*           	| `false`  	| `TITLE_STATE`          	| `SHOW_WHEN_ACTIVE`       	| `true`  	| `true` 	|
| hide          	| *Boolean allowing to smoothly show or hide the BottomBar.*                    	| `false`  	| `Boolean`              	| `false`                  	| `true`  	| `true` 	|
| accentColor   	| *String allowing to set the color of a BottomBarItem when it's selected.*    	| `false`  	| `String`               	| `"red"`                  	| `true`  	| `true` 	|
| inactiveColor 	| *String allowing to set the color of a BottomBarItem when it's not selected.* 	| `false`  	| `String`               	| `"black"`                	| `true`  	| `true` 	|
| colored       	| *Boolean allowing to set the BottomBar colored or not.*                       	| `false`  	| `Boolean`              	| `true`                   	| `true`  	| `true` 	|
| uncoloredBackgroundColor       	| *String allowing to set the BottomBar's background color when colored is `false`.*                       	| `false`  	| `String`              	| `"black"`                   	| `true`  	| `true` 	|
    
 ## Properties (internal)
 
 | Name          	| Description                                                                 	| Required 	| Type                   	| Default                  	| Android 	| iOS    	|
|---------------	|-----------------------------------------------------------------------------	|----------	|------------------------	|--------------------------	|---------	|--------	|
| selectedIndex         	| *Number representing the index of the selected tab.*                                	| `true`   	| `Number` 	| `0` 	| `true`  	| `true` 	|

 ## Mehods
 
| Name                                        	|                Description                	| Type 	| Android 	| iOS  	|
|---------------------------------------------	|:-----------------------------------------:	|-----:	|---------	|------	|
| selectItem(index: number) 	| *Allow to select a tab programmatically.* 	| void 	| true    	| true 	|

# TitleState

### Enum

| Name | Value |
| ---- | ----- |
| SHOW_WHEN_ACTIVE | 0 |
| ALWAYS_SHOW | 1 |
| ALWAYS_HIDE | 2 |

 
# BottomBarItem

 ## Properties (internal)

 | Name          	| Description                                                                 	| Required 	| Type                   	| Default                  	| Android 	| iOS    	|
|---------------	|-----------------------------------------------------------------------------	|----------	|------------------------	|--------------------------	|---------	|--------	|
| index         	| *Number representing the index of the tab.*                                	| `true`   	| `Number` 	|  	| `true`  	| `true` 	|
| title         	| *String representing the title of the tab.*                                	| `true`   	| `String` 	| "" 	| `true`  	| `true` 	|
| icon         	| *String representing the name of the icon of the tab. (must match the name of the icon file in the resources)*                                	| `true`   	| `String` 	| "" 	| `true`  	| `true` 	|
| color         	| *String representing the color of the BottomBar when this tab is selected.*                                	| `true`   	| `String` 	| "" 	| `true`  	| `true` 	|
| notification         	| *Notification/Badge of the tab*                                	| `false`   	| `Notification` 	|  	| `true`  	| `true` 	|

# Notification

 ## Properties (internal)

 | Name          	| Description                                                                 	| Required 	| Type                   	| Default                  	| Android 	| iOS    	|
|---------------	|-----------------------------------------------------------------------------	|----------	|------------------------	|--------------------------	|---------	|--------	|
| textColor         	| *String representing the color of the notification's text*                                	| `true`   	| `String` 	|  	| `false`  	| `true` 	|
| backgroundColor         	| *String representing the background color of the notification*                                	| `true`   	| `String` 	| "" 	| `false`  	| `true` 	|
| value         	| *String representing the text to display inside the Notification/Badge*                                	| `true`   	| `String` 	| "" 	| `true`  	| `true` 	|
