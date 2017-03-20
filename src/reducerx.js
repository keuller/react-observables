import { Subject, from, createStream, ensureStream, isStream } from './util'

const source = new Subject()

const stream$ = createStream(source)

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
