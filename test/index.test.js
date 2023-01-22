// const expect = require('chai').expect;
import { expect } from 'chai';
// const { describe, it } = require('mocha');
import { describe, it } from 'mocha';

// Import main application
import Uniter from '../dist/index.js';

const NUMBERS = {
    '9.99M': 9999999,
    '9.9M': 9909999,
};

describe('Tests', () => {
    describe('Uniter functionality tests', () => {
        describe('Uniter@unite', () => {

            it('should return 9.99M as the result', () => {
                expect(Uniter.unite(NUMBERS['9.99M'])).to.equal('9.99M');
            });

            it('should return -9.99M as the result', () => {
                expect(Uniter.unite(-NUMBERS['9.99M'])).to.equal('-9.99M');
            })

            it('should throw an error when given number is not a number', () => {
                expect(() => Uniter.unite("asd")).to.throw();
            })

            it('should return 9.90M as the result', () => {
                expect(Uniter.unite(NUMBERS['9.9M'])).to.equal('9.90M');
            });

            it('should return 9.99ALPER as the result with given custom units', () => {
                expect(Uniter.unite(NUMBERS['9.99M'], {units: ['T', 'B', 'ALPER', 'K', '']})).to.equal('9.99ALPER');
            });

            it('should return 9.99 without any unit specification', () => {
                expect(Uniter.unite(NUMBERS['9.99M'], {units: ['']})).to.equal('9.99');
            });

            it('should return 9.99M as the result with given custom unit separator', () => {
                expect(Uniter.unite(NUMBERS['9.99M'], {unitSeparator: '-'})).to.equal('9.99-M');
            });

            it('should return 9,99M as the result with given custom decimal separator', () => {
                expect(Uniter.unite(NUMBERS['9.99M'], {separator: ','})).to.equal('9,99M');
            });
        });
    });

    describe('Uniter unit tests', () => {
        // Uniter@unite tests are skipped since all cases are already covered in Uniter functionality tests

        describe('Uniter@splitNumber', () => {
            it('should return ["9", "999", "999"] as the result', () => {
                expect(Uniter.splitNumber(NUMBERS['9.99M'])).to.deep.equal(['9', '999', '999']);
            });

            it('should throw an error when given num is not an integer', () => {
                expect(() => Uniter.splitNumber(undefined)).to.throw();
                expect(() => Uniter.splitNumber('asd')).to.throw();
            });
        });

        describe('Uniter@mergeSignificantDigits', () => {
            it('should return 9.99 as the result', () => {
                expect(Uniter.mergeSignificantDigits(['9', '999', '999'])).to.equal('9.99');
            });

            it('should throw an error when given num is not an number array', () => {
                expect(() => Uniter.mergeSignificantDigits(undefined)).to.throw();
                expect(() => Uniter.mergeSignificantDigits('asd')).to.throw();
            });
        });
    });
});

