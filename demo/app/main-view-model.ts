import {Observable} from 'data/observable';
import {TITLE_STATE} from 'nativescript-bottombar/bottombar-common';

export class HelloWorldModel extends Observable {
  public message: string;
  public titleStateValue: TITLE_STATE;

  constructor() {
    super();
    this.titleStateValue = TITLE_STATE.SHOW_WHEN_ACTIVE;
  }
}