declare module "nativescript-bottomnavigation"
{
    import view = require("ui/core/view");
    import dependencyObservable = require("ui/core/dependency-observable");
    import bindable = require("ui/core/bindable");
    import observable = require("data/observable");

    class BottomNavigationItem extends bindable.Bindable {
        public title: string;
        public icon: string;
        public color: string;
    }

    export class BottomNavigation extends view.View implements view.AddChildFromBuilder
    {
        public static tabSelectedEvent: string;

        on(eventNames: string, callback: (data: observable.EventData) => void, thisArg?: any);

        public static itemsProperty: dependencyObservable.Property;
        
        public static selectedIndexProperty: dependencyObservable.Property;

        selectedIndex: number;

        items: Array<BottomNavigationItem>;

        public _addChildFromBuilder(name: string, value: any): void;
        
        public insertTab(tabItem: BottomNavigationItem, index?: number): void;
    }
}