import {MaskFilter} from "./MaskFilter";


/**
 * Checks than an object is of a given type
 */
export class ValueTypeFilter extends MaskFilter {

    public readonly type: string;

    constructor(type: string) {
        super();
        this.type = type;
    }

    public mask(object: any): any {
        return typeof object == this.type ? object : undefined;
    }

    public toString(): string {
        return 'is ' + this.type;
    }
}

