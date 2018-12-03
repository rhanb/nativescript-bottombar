# Nativescript Bottombar usage with Vue

### Main file

```javascript
import Vue from 'nativescript-vue'
import App from './components/App'

require('nativescript-bottombar/vue').register(Vue);

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
  render: h => h('frame', [h(App)])
}).$start()
```

### Component

- template
```xml
<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <GridLayout columns="*" rows="*, auto">
            <Label class="message" :text="msg" col="0" row="0"/>
            <BottomBar row="1"
                v-on:tabSelected="tabSelected"
                v-bind:labelVisibility="labelVisibility"
                v-on:loaded="barLoaded">
                <BottomBarItem
                    badge="1"
                    icon="ic_home_outline"
                    title="Home 1"
                    checkedIcon="ic_home_filled">
                </BottomBarItem>
                <BottomBarItem
                    icon="ic_home_outline"
                    badge="2"
                    title="Home 2"
                    checkedIcon="ic_home_filled">
                </BottomBarItem>
                <BottomBarItem
                    icon="ic_home_outline"
                    badge="3"
                    title="Home 3"
                    checkedIcon="ic_home_filled">
                </BottomBarItem>
            </BottomBar>
        </GridLayout>
    </Page>
</template>
```

- script
```typescript
<script>
  export default {
    methods: {
      tabSelected: function(event) {
          console.dir(event);
      },
      barLoaded: function(event) {
          console.dir(event);
      }
    },
    data: {
        labelVisibility: 0
    }
  }
</script>
```

- style
```css
<style scoped>
    BottomBar {
        inactive-tint-color: #C34491;
        active-tint-color: #FFFFFF;
        bar-background-color: #9F489B;
        badge-background-color: #222222;
    }

    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
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

[API documentation](https://github.com/rhanbIT/nativescript-bottombar/blob/master/API.md)