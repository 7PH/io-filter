import {MaskFilter} from "./MaskFilter";


export class ValueTypeFilter extends MaskFilter {

    public readonly kind: 'typeof';

    public readonly type: string;

    constructor(type: string) {
        super();
        this.type = type;
    }

    public mask(object: any): any {
        return typeof object == this.type ? object : undefined;
    }
}

