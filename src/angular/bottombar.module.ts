import { NgModule } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';

import { BottomBar, BottomBarItem } from '../';
import { DIRECTIVES } from './bottombar.directives';

@NgModule({
    declarations: DIRECTIVES,
    exports: DIRECTIVES
})
export class BottomBarModule {}

registerElement('BottomBar', () => BottomBar);
registerElement('BottomBarItem', () => BottomBarItem);