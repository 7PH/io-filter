import {MaskFilter} from "./MaskFilter";


export class RegExpFilter extends MaskFilter {

    public readonly kind: 'regexp';

    public readonly regexp: RegExp;

    constructor(regexp: RegExp) {
        super();
        this.regexp = regexp;
    }

    public mask(object: any): any {
        return typeof object == 'string' && this.regexp.test(object) ? object as string : undefined;
    }
}