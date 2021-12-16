import { createStore, combineReducers } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import { composeWithDevTools } from 'redux-devtools-extension'
import localforage from 'localforage'
import * as r from '../reducers'

const appReducer = combineReducers({
  auth: r.auth,
  developer: r.developer,
  maintenance: r.maintenance
})

let store = {}
let persistor = {}
const isClient = typeof window !== 'undefined'
if (isClient) {
  const persistConfig = {
    key: 'root',
    storage: localforage
  }
  const rootReducer = (state, action) => {
    if (action.type === r.AUTH_LOGOUT) {
      localforage.removeItem('persist:root')
      return appReducer({ auth: undefined }, action)
    }
    else {
      return appReducer(state, action)
    }
  }
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  store = createStore(persistedReducer, composeWithDevTools())
  persistor = persistStore(store)
}
else {
  store = createStore(appReducer)
}
export { store, persistor }