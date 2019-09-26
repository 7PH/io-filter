import {MaskFilter} from "./MaskFilter";


/**
 * Apply a RegExp on a given string
 */
export class RegExpFilter extends MaskFilter {

    /** Regexp to apply */
    public readonly regexp: RegExp;

    constructor(regexp: RegExp) {
        super();
        this.regexp = regexp;
    }

    public maskObject(object: any): any {
        if (typeof object !== "string" || ! this.regexp.test(object))
            this.failWith(object + " does not pass the RegExp");
        return object;
    }

    public toString(): string {
        return 'matches ' + this.regexp;
    }
}
