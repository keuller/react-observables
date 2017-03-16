import { from } from 'most'
import { sync } from 'most-subject'

const isObservable = (obs) => (obs.source !== undefined)

const ensureObservable = (action) => isObservable(action) ? action : from([action]);

const stream$ = sync()

// dispatcher
const dispatcher = (...args) => stream$.next(...args)

// Reduxification
export const createStore = (rootReducer, initState) => stream$.chain(ensureObservable).scan(rootReducer, initState)

// dispatch action
export const action = (type, data) => dispatcher({ type, payload: data })

// dispatch async action
export const asyncAction = (type, source$) => {
    stream$.next({ type, payload: source$ })
    if (isObservable(source$)) {
        stream$.next(source$)
    }
}

export const combineReducers = (reducers) => (state, action) => {
    let newState = {...state}
    reducers.forEach(reducer => {
        newState = Object.assign({}, newState, reducer(newState, action))
    })
    return newState
}
