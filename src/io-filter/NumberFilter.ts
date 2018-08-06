import {MaskFilter} from "./MaskFilter";


export class NumberFilter extends MaskFilter {

    public readonly kind: 'number';

    public readonly min: number;

    public readonly max: number;

    public readonly allowCasting: boolean;

    constructor(min: number, max: number, allowCasting?: boolean) {
        super();
        this.min = min;
        this.max = max;
        this.allowCasting = typeof allowCasting === 'undefined' || allowCasting;
    }

    public mask(object: any): any {
        let parsed: number = NaN;
        if (this.allowCasting && typeof object === 'string')
            parsed = parseFloat(object);
        else if (typeof object === 'number')
            parsed = object as number;

        if (isNaN(parsed) || parsed < this.min || parsed > this.max)
            return;

        return parsed;
    }

    public toString(): string {
        return 'e [' + this.min + ',' + this.max + ']';
    }
}