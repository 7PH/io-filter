import {ExistsFilter, MaskFilter, NumberFilter, ObjectFilter, RegExpFilter, ValueTypeFilter} from "../src";
import {EmailFilter} from "../src/io-filter/EmailFilter";

describe('io-filter', function () {

    beforeEach(function() {

        this.check = function(filter: MaskFilter, object: any, passes: boolean): void {
            let error: any;
            try {
                filter.mask(object);
            } catch (e) {
                error = e;
            }
            // if there is an error but there should not be
            if (typeof error !== "undefined" && passes)
                throw new Error("Filter should have succeed: " + error.message);
            // if no error but the filter should have failed
            if (typeof error === "undefined" && ! passes)
                throw new Error("Filter " + filter + " should have failed for object " + object);
        }
    });

    describe('# MaskFilter', function () {

        describe('# ExistsFilter', function() {

            it('should fail when the property is unset', async function() {
                this.check(new ExistsFilter(), undefined, false);
            });

            it('should succeed with set properties', async function() {
                let values = [12, "", 0, Infinity, null, {}];
                for (let value of values)
                    this.check(new ExistsFilter(), value, true);
            });
        });

        describe('# Optional Modifier', function() {

            it('undefined values should be accepted when optional is set to true', async function() {
                this.check(new ExistsFilter().asOptional(), undefined, true);
            });
        });

        describe('# NumberFilter', function() {

            it('should fail with non-numbers', async function () {
                let values = ["notok", "4", null, {}, /foo/, NaN, undefined];
                for (let value of values)
                    this.check(new NumberFilter(- Infinity, + Infinity, false), value, false);
            });

            it('should fail with out-of-limits numbers', async function() {
                let values = [1, 2, 5, 6];
                for (let value of values)
                    this.check(new NumberFilter(3, 4, false), value, false);
            });

            it('should work with valid numbers', async function() {
                let values = [1, 2, 5, 6];
                for (let value of values)
                    this.check(new NumberFilter(1, 9, false), value, true);
            });

            it('should cast the value when specified', async function() {
                let values = [1, "3"];
                for (let value of values)
                    this.check(new NumberFilter(1, 9, true), value, true);
            });
        });

        describe('# RegExpFilter',  function() {

            it('should fail with non-strings', async function() {
                let values = [null, {}, /foo/, NaN, undefined];
                for (let value of values)
                    this.check(new RegExpFilter(/.?/), value, false);
            });

            it('should fail with strings that do not match the regexp', async function() {
                let values = ['foo', 'boar', 'abar'];
                for (let value of values)
                    this.check(new RegExpFilter(/^bar/), value, false);
            });

            it('should work with strings that do match the regexp', async function() {
                let values = ['bar2', 'bar'];
                for (let value of values)
                    this.check(new RegExpFilter(/^bar/), value, true);
            });
        });

        describe('# ValueTypeFilter', async function() {

            it('should fail with wrong types', async function() {
                let values = ['12', true, undefined, null];
                for (let value of values)
                    this.check(new ValueTypeFilter('number'), value, false);
            });

            it('should work with correct types', async function() {
                let values = [12, 0, Infinity];
                for (let value of values)
                    this.check(new ValueTypeFilter('number'), value, true);
            });
        });

        describe('# EmailFilter', function () {

            it('should fail with non-emails', async function() {
                let values = ['foo@bar', undefined, null, 12, NaN, 'aa@bb cc.fr', 'http://foo.bar'];
                for (let value of values)
                    this.check(new EmailFilter(), value, false);
            });

            it('should work with emails', async function() {
                let values = ['foo@bar.bar', 'foo.bar_bar_00@gmail.com'];
                for (let value of values)
                    this.check(new EmailFilter(), value, true);
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

                    return done(new Error("Expected field not found"));
                }

                done();
            });

            it('missing field', async function () {
                const filter: MaskFilter = new ObjectFilter({
                    message: new ObjectFilter({
                        testRegExp      : new RegExpFilter(/^[a-z ]+$/),
                        testNumber      : new NumberFilter(800, 1200),
                        testNumberStr   : new NumberFilter(800, 1200),
                        testValueType   : new ValueTypeFilter('object'),
                        /*ko*/  testExistsKo    : new ExistsFilter(),
                    })
                });

                this.check(filter, this.object, false);
            });

            it('objects should accept optional values', async function () {

                const filter: MaskFilter = new ObjectFilter({
                    foo: new ValueTypeFilter('string'),
                    baz: new EmailFilter().asOptional()
                });

                const o1: any = {foo: "foo", baz: "foo@bar.bz"};
                const o2: any = {foo: "foo"};
                const o3: any = {foo: "foo", baz: "not an email"};

                this.check(filter, o1, true);
                this.check(filter, o2, true);
                this.check(filter, o3, false);
            });
        });
    });
});
