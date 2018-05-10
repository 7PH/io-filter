# IO Filter

Library for runtime-checking types for JS/TS applications, built in TypeScript.
This library provides a way to ensure that data matches a specified mask.
It provides a way to :

- [X] Ensure that an object matches a specified filter (data is set)
- [X] Verify properties on basic types (regexp, number intervals) (data is valid)
- [X] Omit unwanted properties (for socket communications, if you have to pass data from one client to another, you can ensure there is no additional fields set and only pass necessary data over the network)
- [X] Cast objects with filters using custom type guards (only if you're using TypeScript)
- [X] Refactor and document code well

## Installation

The easiest way to install io-filter is with [`npm`][npm].

[npm]: https://www.npmjs.com/

```sh
npm install --save io-filter
```

## Tests

Tested with mocha in TypeScript. Run tests with `npm test`. You can alternatively use `mocha dist/tests/test.js` after transpiling TypeScript with `tsc`. 

## Example

Here's a live example using io-filter in TypeScript.

```typescript
import {ExistsFilter, NumberFilter, ObjectFilter, RegExpFilter, ValueTypeFilter} from "io-filter";



const o: any = {
    message: {
        testRegExp: "the string",
        testNumber: 1000,
        testValueType: [1, 2, 3],
        testExists: "I exist",
        testIgnoredValue: "I exist but will be ignored",
    }
};

let filter: ObjectFilter;


/** Use case */
filter = new ObjectFilter({
    message: new ObjectFilter({
        testRegExp      : new RegExpFilter(/^[a-z ]+$/),
        testNumber      : new NumberFilter(800, 1200),
        testValueType   : new ValueTypeFilter('object'),
        testExists      : new ExistsFilter()
    })
});
console.log("Test 1 ->", filter.mask(o));
/*
Will output:
    Test 1 -> { message:
       { testRegExp: 'the string',
         testNumber: true,
         testValueType: [ 1, 2, 3 ],
         testExists: 'I exist' } }
Note that 'testIgnoredValue' is ignored and omitted in the return value
*/


/** Tests results */
/** - Value not set */
filter = new ObjectFilter({
    message: new ObjectFilter({
        testRegExp      : new RegExpFilter(/^[a-z ]+$/),
        testNumber      : new NumberFilter(800, 1200),
        testValueType   : new ValueTypeFilter('object'),
/*ko*/  testExistsKo    : new ExistsFilter(),
    })
});
console.log("Test 2 ->", filter.mask(o));

/** - Number in wrong interval */
filter = new ObjectFilter({
    message: new ObjectFilter({
        testRegExp      : new RegExpFilter(/^[a-z ]+$/),
/*ko*/  testNumber      : new NumberFilter(1001, 1008),
        testValueType   : new ValueTypeFilter('object'),
        testExists      : new ExistsFilter(),
    })
});
console.log("Test 3 ->", filter.mask(o));

/** - RegExp not matching */
filter = new ObjectFilter({
    message: new ObjectFilter({
/*ko*/  testRegExp      : new RegExpFilter(/^[a-z0-9]+$/),
        testNumber      : new NumberFilter(800, 1200),
        testValueType   : new ValueTypeFilter('object'),
        testExists      : new ExistsFilter(),
    })
});
console.log("Test 4 ->", filter.mask(o));

/** - Wrong value type */
filter = new ObjectFilter({
    message: new ObjectFilter({
        testRegExp      : new RegExpFilter(/^[a-z ]+$/),
        testNumber      : new NumberFilter(800, 1200),
/*ko*/  testValueType   : new ValueTypeFilter('number'),
        testExists      : new ExistsFilter(),
    })
});
console.log("Test 5 ->", filter.mask(o));


/*
Will output:
    Test 2 -> undefined
    Test 3 -> undefined
    Test 4 -> undefined
    Test 5 -> undefined
*/
```
