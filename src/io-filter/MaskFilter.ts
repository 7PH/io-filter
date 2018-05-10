

/** Filter to apply */
export abstract class MaskFilter {

    public abstract readonly kind: 'object' | 'number' | 'exists' | 'regexp' | 'typeof';

    public abstract mask<T>(object: any): T | undefined;

    public is<T>(object: any): object is T {
        return MaskFilter.is<T>(this, object);
    }

    public static is<T>(filter: MaskFilter, object: any): object is T {
        return typeof filter.mask(object) !== "undefined";
    }

    public abstract toString(): string;
}

