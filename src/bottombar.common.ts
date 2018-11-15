import { View, CssProperty, Style, Color } from 'tns-core-modules/ui/core/view';

export class BottomBarBase extends View {

    get inactiveTintColor(): string {
        return this.style.inactiveTintColor;
    }

    set inactiveTintColor(color: string) {
        this.style.inactiveTintColor = color;
    }

    get activeTintColor(): string {
        return this.style.activeTintColor;
    }

    set activeTintColor(color: string) {
        this.style.activeTintColor = color;
    }

    get barBackgroundColor(): string {
        return this.style.barBackgroundColor;
    }

    set barBackgroundColor(color: string) {
        this.style.barBackgroundColor = color;
    }
}

export const inactiveTintColor = new CssProperty<Style, string>({
    name: 'inactiveTintColor', cssName: 'inactive-tint-color', defaultValue: 'grey', valueConverter: colorConverter
});

export const barBackgroundColor = new CssProperty<Style, string>({
    name: 'barBackgroundColor', cssName: 'bar-background-color', defaultValue: 'white', valueConverter: colorConverter
});

export const activeTintColor = new CssProperty<Style, string>({
    name: 'activeTintColor', cssName: 'active-tint-color', defaultValue: 'black', valueConverter: colorConverter
});

declare module 'tns-core-modules/ui/styling/style' {
    interface Style {
        inactiveTintColor: string;
        barBackgroundColor: string;
        activeTintColor: string;
    }
}

inactiveTintColor.register(Style);
activeTintColor.register(Style);
barBackgroundColor.register(Style);

function colorConverter(colorValue: string) {
    return colorValue;
};

