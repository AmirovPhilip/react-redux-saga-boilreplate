import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createBrowserHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'
import { all } from 'redux-saga/effects'

import { userReducer, userSaga } from './modules'

export const history = createBrowserHistory()

export const sagaMiddleware = createSagaMiddleware()

export const reducer = combineReducers({
  user: userReducer,
})

export function* rootSaga() {
  yield all([userSaga()])
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // eslint-disable-line no-underscore-dangle

export const configureStore = () =>
  createStore(reducer, composeEnhancers(applyMiddleware(routerMiddleware, sagaMiddleware)))
