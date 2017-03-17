import Rx from 'rxjs'
import { isStream, ensureStream } from './util'

const stream$ = new Rx.Subject()

// dispatcher
const dispatcher = (...args) => stream$.next(...args)

// Reduxification
export const createStore = (rootReducer, initState) => stream$.flatMap(ensureStream).startWith(initState).scan(rootReducer)

// dispatch action
export const action = (type, data) => dispatcher({ type, payload: data })

// dispatch async action
export const asyncAction = (type, source$) => {
    stream$.next({ type, payload: source$ })
    if (isStream(source$)) {
        stream$.next(source$)
    }
}

// create root reducer
export const combineReducers = (reducers) => (state, action) => {
    let newState = {...state}
    reducers.forEach(reducer => {
        newState = Object.assign({}, newState, reducer(newState, action))
    })
    return newState
}
