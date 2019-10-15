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

  it('async iterable', async function () {
    const ea = new EventArray()

    setTimeout(() => ea.push(1))
    setTimeout(() => ea.push(2))
    setTimeout(() => ea.push(3))

    const values = []
    for await (const val of ea) {
      values.push(val)
      if (values.length === 3) break
    }
    values.should.deepEqual([1, 2, 3])
  })
})
