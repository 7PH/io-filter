import {MaskFilter} from "./MaskFilter";


/**
 * Checks that an object has the given properties
 */
export class ObjectFilter extends MaskFilter {

    /** Expected properties as a map of expected properties names to associated filter */
    public readonly elements: { [key: string]: MaskFilter };

    /**
     * Creates an object filter with its expected properties and associated filter objects
     * @param elements
     */
    constructor(elements: { [key: string]: MaskFilter }) {
        super();
        this.elements = elements;
    }

    public mask(object: any): any {
        // if the object is null
        if (object == null)
            return undefined;
        // prepare the resulting filtered object
        let filtered: any = {};
        // for each expected property
        for (let name in this.elements) {
            // if the property is not set
            if (typeof object[name] === 'undefined')
                return undefined;
            // apply the mask on the child property
            filtered[name] = this.elements[name].mask(object[name]);
            // if the property fails the filter
            if (typeof filtered[name] === 'undefined')
                return undefined;
        }
        // return the filtered object
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
