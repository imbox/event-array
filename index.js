'use strict'
const EventEmitter = require('events')
const { Repeater } = require('@repeaterjs/repeater')

class EventArray extends Array {
  constructor (...args) {
    super(...args)
    this.emitter = new EventEmitter()
    return this
  }

  [Symbol.asyncIterator] () {
    const { emitter } = this
    return new Repeater(async (push, stop) => {
      emitter.on('push', push)
      await stop
      emitter.removeListener('push', push)
    })
  }

  push (...args) {
    const returnValue = super.push(...args)
    this.emit('push', ...args)
    return returnValue
  }

  // Exposed EventEmitter methods
  emit (eventName, ...args) {
    return this.emitter.emit(eventName, ...args)
  }

  eventNames () {
    return this.emitter.eventNames()
  }

  getMaxListeners () {
    return this.emitter.getMaxListeners()
  }

  listenerCount (eventName) {
    return this.emitter.listenerCount(eventName)
  }

  listeners (eventName) {
    return this.emitter.listeners(eventName)
  }

  off (eventName, listener) {
    return this.emitter.off(eventName, listener)
  }

  on (eventName, listener) {
    return this.emitter.on(eventName, listener)
  }

  once (eventName, listener) {
    return this.emitter.once(eventName, listener)
  }

  prependListener (eventName, listener) {
    return this.emitter.prependListener(eventName, listener)
  }

  prependOnceListener (eventName, listener) {
    return this.emitter.prependOnceListener(eventName, listener)
  }

  removeAllListeners (...eventNames) {
    return this.emitter.removeAllListeners(...eventNames)
  }

  removeListener (eventName, listener) {
    return this.emitter.removeListener(eventName, listener)
  }

  setMaxListeners (n) {
    return this.emitter.setMaxListeners(n)
  }

  rawListeners (eventName) {
    return this.emitter.rawListeners(eventName)
  }

  // Override Array methods
  flatMap (...args) {
    return Array.from(this).flatMap(...args)
  }

  map (...args) {
    return Array.from(this).map(...args)
  }
}

module.exports = EventArray
