<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <GridLayout columns="*" rows="*, auto">
            <Label class="message" :text="msg" col="0" row="0"/>
            <BottomBar row="1"
                v-on:tabSelected="tabSelected"
                v-bind:labelVisibility="labelVisibility"
                v-on:loaded="barLoaded">
                <BottomBarItem badgeBackgroundColor="green" badge="1" icon="res://ic_home_outline" title="Home 1" checkedIcon="res://ic_home_filled"></BottomBarItem>
                <BottomBarItem icon="res://ic_home_outline" badge="2" title="Home 2" checkedIcon="res://ic_home_filled"></BottomBarItem>
                <BottomBarItem icon="res://ic_home_outline" badge="3" title="Home 3" checkedIcon="res://ic_home_filled"></BottomBarItem>
            </BottomBar>
        </GridLayout>
    </Page>
</template>

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

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }
    
    BottomBar {
        inactive-tint-color: #C34491;
        active-tint-color: #FFFFFF;
        bar-background-color: #9F489B;
        badge-background-color: #222222;
    }


    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
