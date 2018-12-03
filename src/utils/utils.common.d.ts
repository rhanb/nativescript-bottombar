import { Color } from "tns-core-modules/ui/core/view/view";
import { ImageSource } from "tns-core-modules/image-source/image-source";
export declare function colorConverter(colorValue: string): Color;
export declare class FileNotFoundError extends Error {
    constructor(path: string);
}
export declare function imageConverter(pathValue: string): ImageSource;
