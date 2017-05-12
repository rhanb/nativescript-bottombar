import {View} from "tns-core-modules/ui/core/view";
import {Property} from "tns-core-modules/ui/core/properties";
import {EventData} from "tns-core-modules/data/observable";

export const enum TITLE_STATE {
  SHOW_WHEN_ACTIVE,
  ALWAYS_SHOW,
  ALWAYS_HIDE
}

export interface SelectedIndexChangedEventData extends EventData {
  oldIndex: number;
  newIndex: number;
}

export interface BottomBarItemInterface {

  title: string;
  icon: string;
  color: string;
  index: number;
  notification?: string;
  parent?: WeakRef<any>;

}


export class BottomBarBase extends View {

  public items : BottomBarItemInterface[];
  public selected : number;
  public titleState : TITLE_STATE;
  public hide : boolean;

}

export const itemsProperty = new Property<BottomBarBase, BottomBarItemInterface[]> ({
  name : "items",
  equalityComparer : (a : BottomBarItemInterface[], b : BottomBarItemInterface[]) => !a && !b && a.length === b.length
});

itemsProperty.register(BottomBarBase);



export const selectedIndexProperty = new Property<BottomBarBase, number> ({
  name : "selectedIndex",
  defaultValue : 0,
  valueConverter : value => +value
});

selectedIndexProperty.register(BottomBarBase);



export const titleStateProperty = new Property<BottomBarBase, TITLE_STATE> ({
  name : "titleState"
});

titleStateProperty.register(BottomBarBase);



export const hideProperty = new Property<BottomBarBase, boolean> ({
  name : "hide",
  valueConverter : value => Boolean(value)
});

hideProperty.register(BottomBarBase);
