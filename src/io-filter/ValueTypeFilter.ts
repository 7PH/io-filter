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

    public maskObject(object: any): any {
        if (typeof object !== this.type)
            this.failWith("Value is NOT of type " + this.type);
        return object;
    }

    public toString(): string {
        return 'is ' + this.type;
    }
}

