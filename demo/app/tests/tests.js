const nativescriptBottombar = require('nativescript-bottombar');
const bottomBar = createBottomBar();

/**
 * <ui:BottomBar row="1"
        inactiveTintColor="{{ inactiveTintColor }}">
        <ui:BottomBarItem icon="ic_home_black_24dp" title="Home 1" badge="3"></ui:BottomBarItem>
        <ui:BottomBarItem icon="ic_home_black_24dp" title="Home 2" badge="3"></ui:BottomBarItem>
        <ui:BottomBarItem icon="ic_home_black_24dp" title="Home 3" badge="3"></ui:BottomBarItem>
    </ui:BottomBar>
 */
function createBottomBar() {
    const bar = new nativescriptBottombar.BottomBar();
    const items = [];
    for (let i = 0; i < 3; i++) {
        const item = new nativescriptBottombar.BottomBarItem();
        item.icon = 'ic_home_black_24dp';
        item.title = ['Home', i].join(' ');
        item.badge = i.toString();
        items.push(item);
    }
    bar.items = items;
    return items;
}

describe("should be loaded", function() {
    it("exists", function() {
        console.dir(bottomBar);
        // expect(bottomBar.isLoaded).toBe(true);
    });
});