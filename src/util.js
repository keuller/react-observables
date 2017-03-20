import Kefir from 'kefir'

export function Subject() { this.source = null }
Subject.prototype.setSource = function(value) { this.source = value; return () => {} }
Subject.prototype.next = function(value) { this.source.emit(value) }
Subject.prototype.complete = function() { this.source.end() }

export const fromPromise = (val) => Kefir.fromPromise(val)

export const from = (val) => Kefir.constant(val)

