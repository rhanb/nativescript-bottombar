/// <reference path="./node_modules/tns-core-modules/tns-core-modules.d.ts" /> Needed for autocompletion and compilation.
declare module "nativescript-bottombar"
{
    import view = require("ui/core/view");
    import dependencyObservable = require("ui/core/dependency-observable");
    import bindable = require("ui/core/bindable");
    import observable = require("data/observable");

    export interface SelectedIndexChangedEventData extends observable.EventData {
        oldIndex: number;
        newIndex: number;
    }

    class BottomBarItem extends bindable.Bindable {
        public title: string;
        public icon: string;
        public color: string;
    }

    export class BottomBar extends view.View implements view.AddChildFromBuilder
    {
        public static tabSelectedEvent: string;

        on(eventNames: string, callback: (data: observable.EventData) => void, thisArg?: any);

        public static itemsProperty: dependencyObservable.Property;

        public static titleStateProperty: dependencyObservable.Property;
        
        public static selectedIndexProperty: dependencyObservable.Property;

        selectedIndex: number;

        items: Array<BottomBarItem>;

        public _addChildFromBuilder(name: string, value: any): void;
        
        public insertTab(tabItem: BottomBarItem, index?: number): void;
    }
}