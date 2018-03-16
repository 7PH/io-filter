import {MaskFilter} from "./MaskFilter";


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
            if (typeof object[name] === 'undefined') return undefined;
            filtered[name] = this.elements[name].mask(object[name]);
            if (typeof filtered[name] === 'undefined') return undefined;
        }
        return filtered;
    }

    public toString(): string {
        let s: string = '{';
        for (let key in this.elements) {
            let filter = this.elements[key];
            s += '"' + key + '": ' + filter.toString() + ', ';
        }
        s = s.substr(0, s.length - 2);
        s += '}';
        return s;
    }
}