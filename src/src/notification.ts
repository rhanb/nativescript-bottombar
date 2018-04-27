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