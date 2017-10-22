import * as IOF from './index';




const o = {
    message: {
        from: "PurpleHat",
        to: "Foo",
        content: "Bar",
        time: 82947924
    }
};

const m = {
    elements : [
        {
            name: "message",
            type: IOF.IOMaskFilterType.OBJECT,
            value: {
                elements: [
                    {
                        name: "from",
                        type: IOF.IOMaskFilterType.REGEXP,
                        value: /^[a-zA-Z0-9]{3,20}$/
                    },
                    {
                        name: "to",
                        type: IOF.IOMaskFilterType.TYPEOF,
                        value: /^[a-zA-Z0-9]{3,20}$/
                    },
                    {
                        name: "content",
                        type: IOF.IOMaskFilterType.TYPEOF,
                        value: "string"
                    },
                    {
                        name: "time",
                        type: IOF.IOMaskFilterType.TYPEOF,
                        value: "string"
                    },
                ]
            }
        }
    ]
}

console.log(IOF.IOFilter.filter(o, m));
