import {MaskFilter} from "./MaskFilter";


/**
 * Filter that ensures an object is defined
 */
export class ExistsFilter extends MaskFilter {

    public maskObject(object: any): any {
        return object;
    }

    public toString(): string {
        return 'exists';
    }
}
