# Nativescript Bottombar usage with Vue

### Main file

```javascript
import Vue from 'nativescript-vue'
import App from './components/App'

require('nativescript-bottombar/vue')(Vue);

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
            <BottomBar row="1">
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
</script>
```

- style
```css
<style scoped>
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

