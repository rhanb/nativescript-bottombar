<template>
    <Page>
        <ActionBar title="Welcome to NativeScript-Vue!"/>
        <GridLayout columns="*" rows="*, auto">
            <Label class="message" :text="msg" col="0" row="0"/>
            <BottomBar row="1">
                <BottomBarItem badgeBackgroundColor="green" badge="1" icon="ic_home_outline" title="Home 1" checkedIcon="ic_home_filled"></BottomBarItem>
                <BottomBarItem icon="ic_home_outline" badge="2" title="Home 2" checkedIcon="ic_home_filled"></BottomBarItem>
                <BottomBarItem icon="ic_home_outline" badge="3" title="Home 3" checkedIcon="ic_home_filled"></BottomBarItem>
            </BottomBar>
        </GridLayout>
    </Page>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'Hello World!'
      }
    }
  }
</script>

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
