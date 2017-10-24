import { IOMaskFilterType } from './IOMaskFilterType';


/** The mask interface.
    * You can recursively check objects by setting an IOMaskFilter value
    *   and a IOMaskFilterType.OBJECT type.
    */
export interface IOMaskFilter {
    /** all properties that MUST be set in the objects must be in 'elements'. */
    elements: {
        /** name of the object property. */
        name: string,
        /** type of check */
        type: IOMaskFilterType,
        /** value use to check */
        value: string | RegExp | IOMaskFilter
    }[]
}
