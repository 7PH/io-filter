

/** Filter to apply */
export abstract class MaskFilter {

    public abstract readonly kind: 'object' | 'number' | 'exists' | 'regexp' | 'typeof';

    public abstract mask(object: any): any;

    public test(object: any): boolean {
        return typeof this.mask(object) !== 'undefined';
    }
}



export class ObjectFilter extends MaskFilter {

    public readonly kind: 'object';

    constructor(elements: { [key: string]: MaskFilter }) {
        super();
        this.elements = elements;
    }

    public readonly elements: { [key: string]: MaskFilter };

    public mask(object: any): any {
        if (object == null) return undefined;
        let filtered: any = {};
        for (let name in this.elements) {
            if (! object.hasOwnProperty(name)) return undefined;
            filtered[name] = this.elements[name].mask(object[name]);
            if (typeof filtered[name] === 'undefined') return undefined;
        }
        return filtered;
    }
}


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
}


export class ExistsFilter extends MaskFilter {

    public readonly kind: 'exists';

    public mask(object: any): any {
        return typeof object !== 'undefined' ? object : undefined;
    }
}



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



export class ValueTypeFilter extends MaskFilter {

    public readonly kind: 'typeof';

    public readonly type: string;

    constructor(type: string) {
        super();
        this.type = type;
    }

    public mask(object: any): any {
        return typeof object == this.type ? object : undefined;
    }
}

