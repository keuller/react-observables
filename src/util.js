import Rx from 'rxjs'

export const isStream = (obs) => (obs._isScalar !== undefined)

export const ensureStream = (action) => isStream(action) ? action : Rx.Observable.from([action]);

export const fromPromise = (promise) => Rx.Observable.fromPromise(promise)

export const from = (args) => Rx.Observable.from(args)
