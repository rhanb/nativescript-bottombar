import { Observable } from 'tns-core-modules/data/observable';
import { TabSelectedEventData, BottomBar } from 'nativescript-bottombar';
import { Color } from 'tns-core-modules/color/color';

export class HelloWorldModel extends Observable {
  private _bottomBar: BottomBar;

  constructor() {
    super();
  }

  public bottomBarLoaded(event) {
    console.dir(event);
    this._bottomBar = event.object;
  }

  bottomBarItemSelected(event: TabSelectedEventData) {
    console.dir(event);
  }
}
