/* eslint-env mocha */
require('should')
const EventArray = require('../')

describe('EventArray', function () {
  it('once', function () {
    const ea = new EventArray()
    let eventValues
    ea.once('push', function (...pushed) {
      eventValues = pushed
    })
    ea.push(1, 2, 3)
    eventValues.should.deepEqual([1, 2, 3])
    ea.should.containDeep([1, 2, 3])
  })

  it('map', function () {
    const ea = new EventArray()
    ea.push(1, 2, 3)
    ea.map(x => x + 1).should.deepEqual([2, 3, 4])
  })
})