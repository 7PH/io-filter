import { IOMaskFilter } from './IOMaskFilter';
import { IOMaskFilterType } from './IOMaskFilterType';


/** Utilitary class.
    * Use   IOFilter.filter(..): boolean
    * or    IOFilter.mask(..): object
    */
export class IOFilter {

    /** Wether an object 'o' matches an IOMaskFilter 'mask'.
        * @param object Object to test
        * @param mask Mask
        * @return true if the object recursively matches the mask
        */
    static filter (object: any, mask: IOMaskFilter): boolean {
        // For each elements
        for (var i in mask.elements) {
            let property = mask.elements[i];

            // Ensure 'o' is defined & the property too
            if (typeof (object) === "undefined" || typeof (object[property.name]) === "undefined")
                return false;

            // Just a type check
            if (property.type === IOMaskFilterType.TYPEOF) {
                if (typeof (object[property.name]) !== property.value)
                    return false;
            }

            // RegExp (on string)
            if (property.type === IOMaskFilterType.REGEXP) {
                if (typeof (object[property.name]) !== "string")
                    return false;
                if (! ( property.value as RegExp).exec(object[property.name]))
                    return false;
            }

            // Recursive call
            if (property.type === IOMaskFilterType.OBJECT) {
                if (typeof (object[property.name]) !== "object")
                    return false;
                return this.filter (object[property.name], property.value as IOMaskFilter);
            }

        }

        // No error since then, the object is OK
        return true;
    }
}
