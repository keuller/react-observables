import { from } from 'most'
import { sync } from 'most-subject'

const isStream = (obs) => (obs != undefined && obs.source !== undefined)

const ensureStream = (action) => isStream(action) ? action : from([action]);

const stream$ = sync()

// dispatcher
const dispatcher = (...args) => stream$.next(...args)

// Reduxification
export const createStore = (rootReducer, initState) => stream$.chain(ensureStream).scan(rootReducer, initState)

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
