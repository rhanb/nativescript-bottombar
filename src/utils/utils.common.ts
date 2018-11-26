import { Color } from "tns-core-modules/ui/core/view/view";
import { fromResource, ImageSource } from "tns-core-modules/image-source/image-source";

export function colorConverter(colorValue: string): Color {
    return new Color(colorValue);
};

export class ResourceNotFoundError extends Error {
    constructor(resourceName: string) {
        super();
        this.name = 'ResourceNotFound';
        this.message = `Enable to find resource: ${resourceName}`;
    }
};

export function imageConverter(path: string): ImageSource {
    const image = fromResource(path);

    if (!image) {
        throw new ResourceNotFoundError(path);
    }

    return image;
};
