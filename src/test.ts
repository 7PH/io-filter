import * as IOF from './index';



/** Object to test. */
const o = {
    message: {
        from: "PurpleHat",
        to: "Foo",
        content: "Bar",
        time: 82947924
    }
};

/** Mask */
const m = {
    elements : [
        {
            /** Specifying 'OBJECT' type will call a recursive check */
            name: "message",
            type: IOF.IOMaskFilterType.OBJECT,
            value: {
                elements: [
                    {
                        /* valid because message.from is a string AND matches the RegExp */
                        name: "from",
                        type: IOF.IOMaskFilterType.REGEXP,
                        value: /^[a-zA-Z0-9]{2,20}$/
                    },
                    {
                        /* valid because message.to is a string AND matches the RegExp */
                        name: "to",
                        type: IOF.IOMaskFilterType.REGEXP,
                        value: /^[a-zA-Z0-9]{2,20}$/
                    },
                    {
                        /* valid, because message.content is a string */
                        name: "content",
                        type: IOF.IOMaskFilterType.TYPEOF,
                        value: "string"
                    },
                    {
                        /** Won't work, the type is not valid */
                        name: "time",
                        type: IOF.IOMaskFilterType.TYPEOF,
                        value: "string"
                    },
                ]
            }
        }
    ]
}

// Will return 'false' since the message.time type is incorrect
console.log(IOF.IOFilter.filter(o, m));

// Will return 'true'
m.elements[0].value.elements[3].value = "number";
console.log(IOF.IOFilter.filter(o, m));
