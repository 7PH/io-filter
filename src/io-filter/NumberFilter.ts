import {MaskFilter} from "./MaskFilter";


/**
 * Filter that ensures an object is a number between two ranges
 */
export class NumberFilter extends MaskFilter {

    /**
     * Minimum expected value
     */
    public readonly min: number;

    /**
     * Maximum expected value
     */
    public readonly max: number;

    /**
     * Allow casting if the object is non number for flexibility
     */
    public readonly allowCasting: boolean;

    constructor(min: number, max: number, allowCasting?: boolean) {
        super();
        this.min = min;
        this.max = max;
        this.allowCasting = typeof allowCasting === 'undefined' || allowCasting;
    }

    public maskObject(object: any): any {
        let parsed: number = NaN;
        if (this.allowCasting && typeof object === 'string')
            parsed = parseFloat(object);
        else if (typeof object === 'number')
            parsed = object as number;

        if (isNaN(parsed) || parsed < this.min || parsed > this.max)
            this.failWith("The given object " + object + " is not a number");

        return parsed;
    }

    public toString(): string {
        return 'e [' + this.min + ',' + this.max + ']';
    }
}
