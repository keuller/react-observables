import Kefir from 'kefir'

export function Subject() { this.source = null }
Subject.prototype.setSource = function(value) { this.source = value; return () => {} }
Subject.prototype.next = function(value) { this.source.emit(value) }
Subject.prototype.complete = function() { this.source.end() }

export const isStream = (obs) => (obs != undefined && obs._dispatcher !== undefined)

export const fromPromise = (val) => Kefir.fromPromise(val)

export const from = (val) => Kefir.constant(val)

export const ensureStream = (action) => isStream(action) ? action : from(action)

export const createStream = (source) => Kefir.stream(emitter => source.setSource(emitter))

