


/** Check types. */
export enum IOMaskFilterType {
    /** Just check the type of the property. */
    TYPEOF,
    /** The property must be a 'string' AND match the specified RegExp. */
    REGEXP,
    /** The property must be an object and recursively checked. */
    OBJECT
}
