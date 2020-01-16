import { createStore, combineReducers } from 'redux'
import SwitchReducer from '../Redux/Switch/SwitchReducer'
import UserReducer from '../Redux/User/UserReducer'

const rootReducer = combineReducers({ SwitchReducer: SwitchReducer, UserReducer: UserReducer})

export const store = createStore(rootReducer)
