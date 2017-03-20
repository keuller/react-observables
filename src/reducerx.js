import { createStream, isStream, ensureStream } from './util'

const stream$ = createStream()

// dispatcher
const dispatcher = (...args) => stream$.next(...args)

// Reduxification
export const createStore = (rootReducer, initState) => stream$.flatMap(ensureStream).startWith(initState).scan(rootReducer)

// dispatch action
export const action = (type, data) => {
    dispatcher({ type, payload: data })
    if (isStream(data)) {
        dispatcher(data)
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
