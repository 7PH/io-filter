import { MaskFilter } from './MaskFilter';
import { CheckType } from './CheckType';


/** Utilitary class.
    * Use   Filter.test(..): boolean
    * or    Filter.mask(..): object
    */
export class Filter {

    /** Wether an object 'o' matches an IOMaskFilter 'mask'.
        * @param object Object to test
        * @param mask Mask
        * @return true if the object recursively matches the mask
        */
    static mask (object: any, mask: MaskFilter): undefined | object {
        // filtered object
        var filtered: any = {};

        // For each elements
        for (var i in mask.elements) {
            let property = mask.elements[i];

            // Ensure 'o' is defined & the property too
            if (typeof (object) === "undefined" || typeof (object[property.name]) === "undefined")
                return;

            // The property just has to be defined
            if (property.type === CheckType.DEFINED) {
                filtered[property.name] = object[property.name];
            }

            // Just a type check
            if (property.type === CheckType.TYPEOF) {
                if (typeof (object[property.name]) !== property.value)
                    return;

                filtered[property.name] = object[property.name];
            }

            // RegExp (on string)
            if (property.type === CheckType.REGEXP) {
                if (typeof (object[property.name]) !== "string")
                    return;
                if (! ( property.value as RegExp).exec(object[property.name]))
                    return;

                filtered[property.name] = object[property.name];
            }

            // Recursive call
            if (property.type === CheckType.OBJECT) {
                if (typeof (object[property.name]) !== "object")
                    return;

                let rec = Filter.mask (object[property.name], property.value as MaskFilter);
                if (! rec)
                    return;

                filtered[property.name] = rec;
            }
        }

        // No error since then, the object is OK
        return filtered;
    }



    /** Wether an object 'object' matches a mask filter 'mask'.
        * @param object Object to test
        * @param mask Mask
        * @return true if the object recursively matches the mask
        */
    static test (object: any, mask: MaskFilter): boolean {
        return typeof(Filter.mask(object, mask)) !== "undefined";
    }
}
