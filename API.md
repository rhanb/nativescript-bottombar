# Summary 

1. [BottomBar](#bottombar)
2. [TitleState](#titlestate)
3. [BottomBarItem](#bottombaritem)
3. [Notification](#notification)

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
    
    
 ## Attributes
 
 | Name          	| Description                                                                 	| Required 	| Type                   	| Default                  	| Android 	| iOS    	|
|---------------	|-----------------------------------------------------------------------------	|----------	|------------------------	|--------------------------	|---------	|--------	|
| selectedIndex         	| *Number representing the index of the selected tab.*                                	| `true`   	| `Number` 	| `0` 	| `true`  	| `true` 	|

 ## Mehods
 
| Name                                        	|                Description                	| Type 	| Android 	| iOS  	|
|---------------------------------------------	|:-----------------------------------------:	|-----:	|---------	|------	|
| selectItem(index: number) 	| *Allow to select a tab programmatically.* 	| void 	| true    	| true 	|

# TitleState


# BottomBarItem
# Notification
