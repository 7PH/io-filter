import { IOMaskFilterType } from './IOMaskFilterType';



export interface IOMaskFilter {
    elements: {
        name: string,
        type: IOMaskFilterType,
        value: string | RegExp | IOMaskFilter
    }[]
}
