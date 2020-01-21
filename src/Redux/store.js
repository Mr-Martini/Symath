import { createStore, combineReducers, applyMiddleware } from 'redux'
import SwitchReducer from '../Redux/Switch/SwitchReducer'
import UserReducer from '../Redux/User/UserReducer'
import FeedReducer from '../Redux/FeedBack/FeedBackReducer'
import DataReducer from './Data/DataReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import createSaga from 'redux-saga'
import sagas from './root-saga'

const sagaMidleware = createSaga()

const middlewares = [sagaMidleware]

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  SwitchReducer: SwitchReducer,
  UserReducer: UserReducer,
  FeedReducer: FeedReducer,
  DataReducer: DataReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares)
)

sagaMidleware.run(sagas)

export const persistor = persistStore(store)

export default { store, persistor }
