/* eslint-env mocha */

var fides = require('..');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var assert = chai.assert;

describe('fides', function () {
  describe('.try()', function () {
    it('catches synchronous errors', function () {
      return assert.isRejected(fides.try(() => {
        throw new Error('sync error');
      }), /sync error/);
    });

    it('catches asynchronous errors', function () {
      return assert.isRejected(fides.try(() => {
        return Promise.reject(new Error('async error'));
      }), /async error/);
    });

    it('return synchronous result', function () {
      return assert.becomes(fides.try(() => {
        return 'sync result';
      }), 'sync result');
    });

    it('return asynchronous result', function () {
      return assert.becomes(fides.try(() => {
        return Promise.resolve('async result');
      }), 'async result');
    });
  });

  describe('.fromCallback()', function () {
    it('returns a promise to the callback result', function () {
      return assert.becomes(fides.fromCallback(cb => {
        setTimeout(() => cb(null, 'the result'), 10);
      }), 'the result');
    });

    it('returns a promise to the callback error', function () {
      return assert.isRejected(fides.fromCallback(cb => {
        setTimeout(() => cb(new Error('the error')), 10);
      }), /the error/);
    });
  });

  describe('.delay()', function () {
    it('delays a value', function () {
      return assert.becomes(fides.delay(1, 'the value'), 'the value');
    });

    it('delays a promise', function () {
      return assert.becomes(fides.delay(1, Promise.resolve('the value')), 'the value');
    });

    it('delays a rejection', function () {
      return assert.isRejected(fides.delay(1, Promise.reject('the error')), /the error/);
    });

    it('runs correct delay', function () {
      var results = [];
      return Promise.all([
        fides.delay(100, 1).then(value => results.push(value)),
        fides.delay(400, 2).then(value => results.push(value)),
        fides.delay(300, 3).then(value => results.push(value)),
        fides.delay(200, 4).then(value => results.push(value))
      ])
        .then(() => {
          assert.deepEqual(results, [1, 4, 3, 2]);
        });
    });
  });
});
