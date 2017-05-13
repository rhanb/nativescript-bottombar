import { EventData } from "data/observable";
import { Bindable } from "ui/core/bindable";
import { Property, PropertyChangeData, PropertyMetadataSettings } from "ui/core/dependency-observable";
import { PropertyMetadata } from "ui/core/proxy";
import { View } from "ui/core/view";
import { isUndefined, isDefined, isBoolean, isNumber, isString } from "utils/types";
import { BottomBarItem } from "../index";

export interface SelectedIndexChangedEventData extends EventData {
    oldIndex: number;
    newIndex: number;
}

export const enum TITLE_STATE {
    SHOW_WHEN_ACTIVE,
    ALWAYS_SHOW,
    ALWAYS_HIDE
}
export interface BottomBarItemInterface {
    title: string;
    icon: string;
    color: string;
    index: number;
    notification?: Notification;
    parent?: WeakRef<any>;
}
export class Notification {
    private _textColor: string;
    private _backgroundColor: string;
    private _value: string;

    constructor(textColorValue: string, backgroundColorValue: string, valueValue: string) {
        this._textColor = textColorValue;
        this._backgroundColor = backgroundColorValue;
        this._value = valueValue;
    }

    public get textColor(): string {
        return this._textColor;
    }

    public set textColor(textColorValue: string) {
        this._textColor = textColorValue;
    }

    public get backgroundColor(): string {
        return this._backgroundColor;
    }

    public set backgroundColor(backgroundColorValue: string) {
        this._backgroundColor = backgroundColorValue;
    }
    public get value(): string {
        return this._value;
    }

    public set value(valueValue: string) {
        this._value = valueValue;
    }

}
let ITEMS = "items"
    , SELECTED_INDEX = "selectedIndex"
    , BOTTOM_NAV = "BottomBarCommon"
    , CHILD_BOTTOM_NAV_ITEM = "BottomBarItemCommon"
    , TITLE_STATE_PROPERTY = "titleState"
    , HIDE = "hide"
    , INACTIVE_COLOR = "inactiveColor"
    , ACCENT_COLOR = "accentColor";

let itemsProperty = new Property(ITEMS, BOTTOM_NAV, new PropertyMetadata(undefined))
    , selectedIndexProperty = new Property(SELECTED_INDEX, BOTTOM_NAV, new PropertyMetadata(undefined))
    , titleStateProperty = new Property(TITLE_STATE_PROPERTY, BOTTOM_NAV, new PropertyMetadata(undefined))
    , hideProperty = new Property(HIDE, BOTTOM_NAV, new PropertyMetadata(undefined))
    , inactiveColorProperty = new Property(INACTIVE_COLOR, BOTTOM_NAV, new PropertyMetadata(undefined))
    , accentColorProperty = new Property(ACCENT_COLOR, BOTTOM_NAV, new PropertyMetadata(undefined));;




(<PropertyMetadata>itemsProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    let bottomnav = <BottomBarCommon>data.object;
    bottomnav._onItemsPropertyChangedSetNativeValue(data);
};

(<PropertyMetadata>selectedIndexProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    let bottomnav = <BottomBarCommon>data.object;
    bottomnav._onSelectedIndexPropertyChangedSetNativeValue(data);
};
(<PropertyMetadata>titleStateProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    let bottomnav = <BottomBarCommon>data.object;
    bottomnav._titleStatePropertyChangedSetNativeValue(data);
};
(<PropertyMetadata>hideProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    let bottomnav = <BottomBarCommon>data.object;
    bottomnav._hidePropertyChangedSetNativeValue(data);
};
(<PropertyMetadata>accentColorProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    let bottomnav = <BottomBarCommon>data.object;
    bottomnav._accentColorPropertyChangedSetNativeValue(data);
};
(<PropertyMetadata>inactiveColorProperty.metadata).onSetNativeValue = function (data: PropertyChangeData) {
    let bottomnav = <BottomBarCommon>data.object;
    bottomnav._inactiveColorPropertyChangedSetNativeValue(data);
};

export class BottomBarCommon extends View {

    public static itemsProperty = itemsProperty;
    public static selectedIndexProperty = selectedIndexProperty;
    public static tabSelectedEvent = "tabSelected";
    public static titleStateProperty = titleStateProperty;
    public static hideProperty = hideProperty;
    public static accentColorProperty = accentColorProperty;
    public static inactiveColorProperty = inactiveColorProperty;

    get items(): Array<any> {
        return this._getValue(BottomBarCommon.itemsProperty);
    }

    set items(value: Array<any>) {
        this._setValue(BottomBarCommon.itemsProperty, value);
    }
    public _onItemsPropertyChangedSetNativeValue(data: PropertyChangeData) {

    }

    get selectedIndex(): number {
        return this._getValue(BottomBarCommon.selectedIndexProperty);
    }

    set selectedIndex(value: number) {
        this._setValue(BottomBarCommon.selectedIndexProperty, value);
    }

    public _onSelectedIndexPropertyChangedSetNativeValue(data: PropertyChangeData) {
        let index = this.selectedIndex;
        if (isUndefined(index)) {
            return;
        }

        if (isDefined(this.items)) {
            if (index < 0 || index >= this.items.length) {
                this.selectedIndex = undefined;
                throw new Error("SelectedIndex should be between [0, items.length)");
            }
        }
        let args = {
            eventName: BottomBarCommon.tabSelectedEvent,
            object: this,
            oldIndex: data.oldValue,
            newIndex: data.newValue
        };
        this.notify(args);
    }

    get titleState(): TITLE_STATE {
        return this._getValue(BottomBarCommon.titleStateProperty);
    }
    set titleState(titleStateValue: TITLE_STATE) {
        this._setValue(BottomBarCommon.titleStateProperty, titleStateValue);
    }

    public _titleStatePropertyChangedSetNativeValue(data: PropertyChangeData): void {
        let newTitleState = data.newValue;
        if (isDefined(newTitleState)) {
            if (!isNumber(newTitleState)) {
                throw new Error("Must be an enum");
            }
        } else {
            throw new Error('Must have titleState');
        }
    }

    get hide(): boolean {
        return this._getValue(BottomBarCommon.hideProperty);
    }

    set hide(hideValue: boolean) {
        this._setValue(BottomBarCommon.hideProperty, hideValue);
    }


    public _hidePropertyChangedSetNativeValue(data: PropertyChangeData): void {
        let newHideValue = data.newValue;
        if (isDefined(newHideValue)) {
            if (!isBoolean(newHideValue)) {
                throw new Error("Must be a boolean");
            }
        } else {
            throw new Error('Must have hide');
        }
    }

    public get accentColor(): string {
        return this._getValue(BottomBarCommon.accentColorProperty);
    }

    public set accentColor(accentColorValue: string) {
        this._setValue(BottomBarCommon.accentColorProperty, accentColorValue);
    }

    public get inactiveColor(): string {
        return this._getValue(BottomBarCommon.inactiveColorProperty);
    }

    public set inactiveColor(inactiveColorValue: string) {
        this._setValue(BottomBarCommon.inactiveColorProperty, inactiveColorValue);
    }

    public _accentColorPropertyChangedSetNativeValue(data: PropertyChangeData): void {
        let newAccentColorValue = data.newValue;
        if (isDefined(newAccentColorValue)) {
            if (!isString(newAccentColorValue)) {
                throw new Error("Must be a string");
            }
        } else {
            throw new Error('Must have accent color');
        }
    }

    public _inactiveColorPropertyChangedSetNativeValue(data: PropertyChangeData): void {
        let newInactiveColorValue = data.newValue;
        if (isDefined(newInactiveColorValue)) {
            if (!isString(newInactiveColorValue)) {
                throw new Error("Must be a string");
            }
        } else {
            throw new Error('Must have accent color');
        }
    }
}