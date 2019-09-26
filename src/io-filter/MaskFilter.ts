/**
 * Abstract class representing a filter for a specified input object
 */
export abstract class MaskFilter {

    /**
     * Whether the value can be undefined
     */
    protected optional: boolean = false;

    /**
     * Mask an object
     * @param object
     */
    public mask<T>(object: any): T {
        // if the object is undefined
        if (typeof object === "undefined") {
            // and this is allowed
            if (this.optional) {
                // return undefined as a valid value
                return undefined as any;
            } else {
                // fail if undefined value is not allowed
                this.failWith("Value is undefined but the optional flag is set to false");
            }
        }
        return this.maskObject<T>(object);
    };

    /**
     * Abstract mask method that takes an object and ensures the object is valid.
     *  If the object is valid, this function should return the filtered object.
     *  If invalid, this function should throw an error.
     * @param object The filtered object (never undefined)
     */
    protected abstract maskObject<T>(object: any): T;

    /**
     * Apply this filter to a specified object
     * @param object Object to check
     */
    public is<T>(object: any): object is T {
        return MaskFilter.is<T>(this, object);
    }

    /**
     * Apply a given filter to a specified object
     * @param filter Filter to apply
     * @param object Object to check
     * @return True only if the object passes the filter
     */
    public static is<T>(filter: MaskFilter, object: any): object is T {
        try {
            filter.mask(object);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Fail with a specific message
     * @param message
     */
    protected failWith(message?: string): void {
        if (typeof message !== "undefined") {
            throw new Error(message);
        } else {
            throw new Error(`Filter Error: ${this.constructor.name} failed.`);
        }
    }

    /**
     * Set this MaskFilter as optional
     */
    public asOptional(): MaskFilter {
        this.optional = true;
        return this;
    }

    /**
     * String representation of this filter
     */
    public abstract toString(): string;
}

