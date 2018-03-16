import {MaskFilter} from "./MaskFilter";


export class ExistsFilter extends MaskFilter {

    public readonly kind: 'exists';

    public mask(object: any): any {
        return typeof object !== 'undefined' ? object : undefined;
    }

    public toString(): string {
        return 'exists';
    }
}
