import { Color } from "tns-core-modules/ui/core/view/view";
import { ImageSource, fromFileOrResource } from "tns-core-modules/image-source/image-source";
import { isFileOrResourcePath } from "tns-core-modules/utils/utils";

export function colorConverter(colorValue: string): Color {
    return new Color(colorValue);
}

export class FileNotFoundError extends Error {
    constructor(path: string) {
        super();
        this.name = 'ResourceNotFound';
        this.message = `Enable to find file: ${path}`;
    }
}

export function imageConverter(pathValue: string): ImageSource {
    if (!isFileOrResourcePath(pathValue)) {
        throw new FileNotFoundError(pathValue);
    }

    return fromFileOrResource(pathValue);
}