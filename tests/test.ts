import {ExistsFilter, MaskFilter, NumberFilter, ObjectFilter, RegExpFilter, ValueTypeFilter} from "../src";

describe('io-filter', function () {

    describe('# MaskFilter', function () {

        describe('# ExistsFilter', function() {

            it('should fail when the property is unset', async function() {
                if (typeof new ExistsFilter().mask(undefined) !== "undefined")
                    throw new Error("Unset property should fail ExistsFilter");
            });

            it('should succeed with set properties', async function() {
                let values = [12, "", 0, Infinity, null, {}];
                for (let value of values)
                    if (typeof new ExistsFilter().mask(12) === "undefined")
                        throw new Error("Set property " + value + " should not fail ExistsFilter");
            });
        });

        describe('# NumberFilter', function() {

            it('should fail with non-numbers', async function () {
                let values = ["notok", "4", null, {}, /foo/, NaN, undefined];
                for (let value of values)
                    if (typeof new NumberFilter(- Infinity, + Infinity, false).mask(value) !== "undefined")
                        throw new Error("Value " + value + " should fail");
            });

            it('should fail with out-of-limits numbers', async function() {
                let values = [1, 2, 5, 6];
                for (let value of values)
                    if (typeof new NumberFilter(3, 4, false).mask(value) !== "undefined")
                        throw new Error("Value " + value + " should fail the filter");
            });

            it('should work with valid numbers', async function() {
                let values = [1, 2, 5, 6];
                for (let value of values)
                    if (typeof new NumberFilter(1, 9, false).mask(value) === "undefined")
                        throw new Error("Value " + value + " should NOT fail the filter");
            });

            it('should cast the value when specified', async function() {
                let values = [1, "3"];
                for (let value of values)
                    if (typeof new NumberFilter(1, 9, true).mask(value) === "undefined")
                        throw new Error("Value " + value + " should NOT fail the filter");
            });
        });

        describe('# RegExpFilter',  function() {

            it('should fail with non-strings', async function() {
                let values = [null, {}, /foo/, NaN, undefined];
                for (let value of values)
                    if (typeof new RegExpFilter(/.?/).mask(value) !== "undefined")
                        throw new Error("Value " + value + " should fail");
            });

            it('should fail with strings that do not match the regexp', async function() {
                let values = ['foo', 'boar', 'abar'];
                for (let value of values)
                    if (typeof new RegExpFilter(/^bar/).mask(value) !== "undefined")
                        throw new Error("Value " + value + " should fail");
            });

            it('should work with strings that do match the regexp', async function() {
                let values = ['bar2', 'bar'];
                for (let value of values)
                    if (typeof new RegExpFilter(/^bar/).mask(value) === "undefined")
                        throw new Error("Value " + value + " should NOT fail");
            });
        });

        describe('# ValueTypeFilter', async function() {

            it('should fail with wrong types', async function() {
                let values = ['12', true, undefined, null];
                for (let value of values)
                    if (typeof new ValueTypeFilter('number').mask(value) !== "undefined")
                        throw new Error("Value " + value + " should fail");
            });

            it('should work with correct types', async function() {
                let values = [12, 0, Infinity];
                for (let value of values)
                    if (typeof new ValueTypeFilter('number').mask(value) === "undefined")
                        throw new Error("Value " + value + " should fail");
            });
        });

        describe('# ObjectFilter', function () {

            beforeEach(function() {
                this.object = {
                    message: {
                        testRegExp: "the string",
                        testNumber: 1000,
                        testNumberStr: '1000',
                        testValueType: [1, 2, 3],
                        testExists: "I exist",
                        testIgnoredValue: "I exist too",
                    }
                };
            });

            it('working example with ignored field', function (done) {
                const filter: MaskFilter = new ObjectFilter({
                    message: new ObjectFilter({
                        testRegExp      : new RegExpFilter(/^[a-z ]+$/),
                        testNumber      : new NumberFilter(800, 1200),
                        testNumberStr   : new NumberFilter(800, 1200),
                        testValueType   : new ValueTypeFilter('object'),
                        testExists      : new ExistsFilter()
                    })
                });

                let masked: any = filter.mask(this.object);

                if (typeof masked === "undefined"
                    || typeof masked.message !== "object"
                    || typeof masked.message.testRegExp !== "string"
                    || typeof masked.message.testNumber !== "number"
                    || typeof masked.message.testValueType !== "object"
                    || typeof masked.message.testExists !== "string") {

                    // wrong
                    return done(new Error("Expected field not found"));
                }

                done();
            });

            it('missing field', function (done) {
                const filter: MaskFilter = new ObjectFilter({
                    message: new ObjectFilter({
                        testRegExp      : new RegExpFilter(/^[a-z ]+$/),
                        testNumber      : new NumberFilter(800, 1200),
                        testNumberStr   : new NumberFilter(800, 1200),
                        testValueType   : new ValueTypeFilter('object'),
                        /*ko*/  testExistsKo    : new ExistsFilter(),
                    })
                });

                if (typeof filter.mask(this.object) !== "undefined") {
                    return done(new Error("Should have been false"));
                }
                done();
            });
        });
    });
});
