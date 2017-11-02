# (io-filter) IO Filter

Library for runtime-checking types in TypeScript.
In some cases, type-checking can not be used in TypeScript (for instance when data arrives from a WebSocket connection through JSON.parse/JSON.stringify).
This library provides a way to ensure that data match a specified mask.

This libary is used in my PH-Web-Socket project.

@see PH-Web-Socket

## Installation

The easiest way to install io-filter is with [`npm`][npm].

[npm]: https://www.npmjs.com/

```sh
npm install --save io-filter
```

## Example

Here's a live example of the use of io-filter in TypeScript.

```typescript
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

// Will return 'undefined' since the message.time type is incorrect
console.log(iof.Filter.mask(o, m));

// Will return :
// { message: { from: 'PurpleHat', content: 'Bar', time: 82947924 } }
m.elements[0].value.elements[2].value = "number";
console.log(iof.Filter.mask(o, m));

```
