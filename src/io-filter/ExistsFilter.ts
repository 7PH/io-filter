import {MaskFilter} from "./MaskFilter";


/**
 * Filter that ensures an object is defined
 */
export class ExistsFilter extends MaskFilter {

    public mask(object: any): any {
        return typeof object !== 'undefined' ? object : undefined;
    }

    public toString(): string {
        return 'exists';
    }
}
