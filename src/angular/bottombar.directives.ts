import { Directive } from "@angular/core";

@Directive({
    selector: "BottomBar"
})
export class BottomBarDirective { }

@Directive({
    selector: "BottomBarItem"
})
export class BottomBarItemDirective { }

export const DIRECTIVES = [
    BottomBarDirective,
    BottomBarItemDirective
];