import { createStore, combineReducers } from 'redux'
import SwitchReducer from '../Redux/Switch/SwitchReducer'
import UserReducer from '../Redux/User/UserReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
  }

const rootReducer = combineReducers({ SwitchReducer: SwitchReducer, UserReducer: UserReducer})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)

export default { store, persistor }
