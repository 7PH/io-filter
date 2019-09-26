/**
 * Abstract class representing a filter for a specified input object
 */
export abstract class MaskFilter {

    /**
     * Abstract mask method that takes an object and ensures the object is valid.
     *  If the object is valid, this function should return the filtered object.
     *  If invalid, this function should return undefined
     * @param object Undefined if the check fails, else the filtered object
     */
    public abstract mask<T>(object: any): T | undefined;

    /**
     * Apply this mask to a specified object
     * @param object Undefined if the check fails, else the filtered object
     */
    public is<T>(object: any): object is T {
        return MaskFilter.is<T>(this, object);
    }

    /**
     * Apply a given filter to a specified object
     * @param filter Filter to apply
     * @param object Undefined if the check fails, else the filtered object
     */
    public static is<T>(filter: MaskFilter, object: any): object is T {
        return typeof filter.mask(object) !== "undefined";
    }

    /**
     * String representation of this filter
     */
    public abstract toString(): string;
}

