import { IOMaskFilter } from './IOMaskFilter';
import { IOMaskFilterType } from './IOMaskFilterType';





export class IOFilter {

    constructor() { }

    static filter (o: any, mask: IOMaskFilter): boolean {
        // For each elements
        for (var i in mask.elements) {
            let property = mask.elements[i];

            // Ensure 'o' is defined & the property too
            if (typeof (o) === "undefined" || typeof (o[property.name]) === "undefined")
                return false;

            // Just a type check
            if (property.type === IOMaskFilterType.TYPEOF) {
                if (typeof (o[property.name]) !== property.value)
                    return false;
            }

            // RegExp (on string)
            if (property.type === IOMaskFilterType.REGEXP) {
                if (typeof (o[property.name]) !== "string")
                    return false;
                if (! ( property.value as RegExp).exec(o[property.name]))
                    return false;
            }

            // Recursive call
            if (property.type === IOMaskFilterType.OBJECT) {
                if (typeof (o[property.name]) !== "object")
                    return false;
                return this.filter (o[property.name], property.value as IOMaskFilter);
            }
        }

        // No error since then, the object is OK
        return true;
    }
}
