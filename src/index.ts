import { EventEmitter, on } from 'events'

class EventArray<T> extends Array<T> {
  emitter: EventEmitter

  constructor (...args: T[]) {
    super(...args)
    this.emitter = new EventEmitter()
    return this
  }

  [Symbol.asyncIterator] () {
    return on(this.emitter, 'push')
  }

  push (...args: T[]): number {
    const returnValue = super.push(...args)
    this.emit('push', ...args)
    return returnValue
  }

  // Exposed EventEmitter methods
  emit (eventName: string | symbol, ...args: T[]): boolean {
    return this.emitter.emit(eventName, ...args)
  }

  eventNames (): (string | symbol)[] {
    return this.emitter.eventNames()
  }

  getMaxListeners () {
    return this.emitter.getMaxListeners()
  }

  listenerCount (eventName: string | symbol) {
    return this.emitter.listenerCount(eventName)
  }

  listeners (eventName: string | symbol) {
    return this.emitter.listeners(eventName)
  }

  off (eventName: string | symbol, listener: (...args: any[]) => void): this {
    this.emitter.off(eventName, listener)
    return this
  }

  on (eventName: string | symbol, listener: (...args: any[]) => void): this {
    this.emitter.on(eventName, listener)
    return this
  }

  once (eventName: string | symbol, listener: (...args: any[]) => void) {
    this.emitter.once(eventName, listener)
    return this
  }

  prependListener (eventName: string | symbol, listener: (...args: any[]) => void): this {
    this.emitter.prependListener(eventName, listener)
    return this
  }

  prependOnceListener (eventName: string | symbol, listener: (...args: any[]) => void): this {
    this.emitter.prependOnceListener(eventName, listener)
    return this
  }

  removeAllListeners (...eventNames: (string | symbol)[]): this {
    this.emitter.removeAllListeners(...eventNames)
    return this
  }

  removeListener (eventName: string | symbol, listener: (...args: any[]) => void): this {
    this.emitter.removeListener(eventName, listener)
    return this
  }

  setMaxListeners (n: number): this {
    this.emitter.setMaxListeners(n)
    return this
  }

  rawListeners (eventName: string | symbol) {
    return this.emitter.rawListeners(eventName)
  }

  // Override Array methods
  flatMap<U, This = undefined> (callbackFn: (this: This, value: T, index: number, array: T[]) => U | ReadonlyArray<U>): U[] {
    return Array.from(this).flatMap<U, This>(callbackFn)
  }

  map<U> (callbackFn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] {
    return Array.from(this).map(callbackFn)
  }
}

export = EventArray
