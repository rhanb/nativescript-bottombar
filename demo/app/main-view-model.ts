import { Observable } from 'tns-core-modules/data/observable';
import { Bottombar } from 'nativescript-bottombar';

export class HelloWorldModel extends Observable {
  public message: string;
  private bottombar: Bottombar;

  constructor() {
    super();

    this.bottombar = new Bottombar();
  }
}
