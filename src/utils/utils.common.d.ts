import { Color } from "tns-core-modules/ui/core/view/view";
import { ImageSource } from "tns-core-modules/image-source/image-source";
export declare function colorConverter(colorValue: string): Color;
export declare class ResourceNotFoundError extends Error {
    constructor(resourceName: string);
}
export declare function imageConverter(path: string): ImageSource;
