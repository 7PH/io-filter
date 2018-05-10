

/** Filter to apply */
export abstract class MaskFilter {

    public abstract readonly kind: 'object' | 'number' | 'exists' | 'regexp' | 'typeof';

    public abstract mask<T>(object: any): T | undefined;

    public instanceOf<T>(object: any): object is T {
        return MaskFilter.instanceOf<T>(this, object);
    }

    public static instanceOf<T>(filter: MaskFilter, object: any): object is T {
        return typeof filter.mask(object) !== "undefined";
    }

    public abstract toString(): string;
}

