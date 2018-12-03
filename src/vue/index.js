module.exports = {
    register(Vue) {
        Vue.registerElement('BottomBar', () => require('../').BottomBar);
        Vue.registerElement('BottomBarItem', () => require('../').BottomBarItem);
    }
};
