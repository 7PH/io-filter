import * as iof from './index';



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
            type: iof.CheckType.OBJECT,
            value: {
                elements: [
                    {
                        /* valid because message.from is a string AND matches the RegExp */
                        name: "from",
                        type: iof.CheckType.REGEXP,
                        value: /^[a-zA-Z0-9]{2,20}$/
                    },
                    {
                        /* valid, because message.content is a string */
                        name: "content",
                        type: iof.CheckType.TYPEOF,
                        value: "string"
                    },
                    {
                        /** Won't work, the type is not valid */
                        name: "time",
                        type: iof.CheckType.TYPEOF,
                        value: "string"
                    },
                ]
            }
        }
    ]
}

// Will return 'false' since the message.time type is incorrect
console.log(iof.Filter.mask(o, m));

// Will return 'true'
m.elements[0].value.elements[2].value = "number";
console.log(iof.Filter.mask(o, m));
