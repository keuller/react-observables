import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/from'
import 'rxjs/add/observable/fromPromise'

export const createStream = () => { return new Subject() }

export const isStream = (obs) => (obs._isScalar !== undefined)

export const ensureStream = (action) => isStream(action) ? action : Observable.from([action]);

export const promise = (obj) => Observable.fromPromise(obj)

export const from = (args) => Observable.from(args)
