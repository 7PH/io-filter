import {ExistsFilter, MaskFilter, NumberFilter, ObjectFilter, RegExpFilter, ValueTypeFilter} from "../src";

describe('io-filter', function () {
    this.slow(10000);


    describe('#filter()', function () {

        beforeEach(function() {
            this.object = {
                message: {
                    testRegExp: "the string",
                    testNumber: 1000,
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
                    testValueType   : new ValueTypeFilter('object'),
                    /*ko*/  testExistsKo    : new ExistsFilter(),
                })
            });

            if (typeof filter.mask(this.object) !== "undefined") {
                return done(new Error("Should have been false"));
            }
            done();
        });

        it('wrong number interval', function (done) {
            const filter: MaskFilter = new ObjectFilter({
                message: new ObjectFilter({
                    testRegExp      : new RegExpFilter(/^[a-z ]+$/),
                    /*ko*/  testNumber      : new NumberFilter(1001, 1008),
                    testValueType   : new ValueTypeFilter('object'),
                    testExists      : new ExistsFilter(),
                })
            });

            if (typeof filter.mask(this.object) !== "undefined") {
                return done(new Error("Should have been false"));
            }
            done();
        });

        it('regexp does not match', function (done) {
            const filter: MaskFilter = new ObjectFilter({
                message: new ObjectFilter({
                    /*ko*/  testRegExp      : new RegExpFilter(/^[a-z0-9]+$/),
                    testNumber      : new NumberFilter(800, 1200),
                    testValueType   : new ValueTypeFilter('object'),
                    testExists      : new ExistsFilter(),
                })
            });

            if (typeof filter.mask(this.object) !== "undefined") {
                return done(new Error("Should have been false"));
            }
            done();
        });

        it('wrong value type', function (done) {
            const filter: MaskFilter = new ObjectFilter({
                message: new ObjectFilter({
                    testRegExp      : new RegExpFilter(/^[a-z ]+$/),
                    testNumber      : new NumberFilter(800, 1200),
                    /*ko*/  testValueType   : new ValueTypeFilter('number'),
                    testExists      : new ExistsFilter(),
                })
            });

            if (typeof filter.mask(this.object) !== "undefined") {
                return done(new Error("Should have been false"));
            }
            done();
        });


    });
});
