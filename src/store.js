import { createStore, combineReducers } from 'lib/reducerx'

// application initial state
const initState = { name: 'Harry Potter', count: 0, users: [] }

const counter = (state, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                count: state.count - 1
            }
        default:
            return state
    }
}

const name = (state, action) => {
    if (action.type == 'NAME_CHANGED') {
        return { ...state, name: action.payload }
    }
    return state
}

const users = (state, action) => {
    switch(action.type) {
        case 'USERS_LOADING':
            return {
                ...state,
                users: []
            }
        case 'USERS_LOADED':
            return {
                ...state,
                users: action.payload
            }
        default:
            return state
    }
}

export default createStore(combineReducers([counter, name, users]), initState)
