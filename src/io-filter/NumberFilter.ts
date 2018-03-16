import {MaskFilter} from "./MaskFilter";


export class NumberFilter extends MaskFilter {

    public readonly kind: 'number';

    public readonly min: number;

    public readonly max: number;

    constructor(min: number, max: number) {
        super();
        this.min = min;
        this.max = max;
    }

    public mask(object: any): any {
        return typeof object == 'number' && object >= this.min && object <= this.max ? object : undefined;
    }

    public toString(): string {
        return 'e [' + this.min + ',' + this.max + ']';
    }
}