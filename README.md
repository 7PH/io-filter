# io-filter

Simple to use lib to runtime-check the structure of javascript objects

It provides a way to :

- [X] ensure that an object matches a structure
- [X] verify data is valid (regexp, number intervals)
- [X] omit unwanted properties
- [X] cast objects with filters using custom type guards for TypeScript

## install

The easiest way to install io-filter is with [`npm`][npm].

[npm]: https://www.npmjs.com/

```sh
npm install --save io-filter
```

## test

Tested with mocha in TypeScript. Run tests with `npm test`. You can alternatively use `mocha dist/tests/test.js` after transpiling TypeScript with `tsc`. 

## try

Here's a live example using io-filter

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



filter = new ObjectFilter({
    message: new ObjectFilter({
        testRegExp      : new RegExpFilter(/^[a-z ]+$/),
        testNumber      : new NumberFilter(800, 1200),
        testValueType   : new ValueTypeFilter('object'),
        testExists      : new ExistsFilter()
    })
});
console.log("Test 1 ->", filter.mask(o));
// 'testIgnoredValue' will be ignored and omitted in the returned value


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
    Test 1 -> { message:
       { testRegExp: 'the string',
         testNumber: true,
         testValueType: [ 1, 2, 3 ],
         testExists: 'I exist' } }
    Test 2 -> undefined
    Test 3 -> undefined
    Test 4 -> undefined
    Test 5 -> undefined
*/
```
