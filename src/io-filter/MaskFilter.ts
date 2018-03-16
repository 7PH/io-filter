

/** Filter to apply */
export abstract class MaskFilter {

    public abstract readonly kind: 'object' | 'number' | 'exists' | 'regexp' | 'typeof';

    public abstract mask(object: any): any;

    public test(object: any): boolean {
        return typeof this.mask(object) !== 'undefined';
    }

    public abstract toString(): string;
}

