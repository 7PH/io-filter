


/** Check types. */
export enum IOMaskFilterType {
    /** The property must be an object and recursively checked. */
    OBJECT,
    /** Just check the type of the property. */
    TYPEOF,
    /** The property must be a 'string' AND match the specified RegExp. */
    REGEXP,
    /** Property just has to be defined. */
    DEFINED
}
