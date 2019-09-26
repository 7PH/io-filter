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

    public mask(object: any): any {
        return typeof object == 'string' && this.regexp.test(object) ? object as string : undefined;
    }

    public toString(): string {
        return 'matches ' + this.regexp;
    }
}
