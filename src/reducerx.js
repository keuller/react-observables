import { Subject, from } from './util'
import Kefir from 'kefir'

const isStream = (obs) => (obs != undefined && obs._dispatcher !== undefined)

const ensureStream = (action) => isStream(action) ? action : from(action)

const source = new Subject()
const stream$ = Kefir.stream(emitter => source.setSource(emitter))

// dispatcher
const dispatcher = (...args) => source.next(...args)

export const createStore = (rootReducer, initState) => {
    return stream$.flatMap(ensureStream).scan(rootReducer, initState)
}

// dispatch action
export const action = (type, data) => {
    dispatcher({ type, payload: data })
    if (isStream(data)) {
        dispatcher(data)
    }
}

export const combineReducers = (reducers) => (state, action) => {
    let newState = {...state}
    reducers.forEach(reducer => {
        newState = Object.assign({}, newState, reducer(newState, action))
    })
    return newState
}
