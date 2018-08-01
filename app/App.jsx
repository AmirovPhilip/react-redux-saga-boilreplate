import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { ThemeProvider } from 'styled-components'

import { Theme } from './theme/theme'
import { globalStyles } from './globalStyles'
import { configureStore, sagaMiddleware, rootSaga, history } from './redux'

export const store = configureStore()
sagaMiddleware.run(rootSaga)

globalStyles()

export const getApp = (Component) => () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={Theme}>
        <Component />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>
)

export const renderApp = (Component, element) => {
  const App = getApp(Component)
  ReactDOM.render(<App />, element)
}

if (module.hot) {
  module.hot.accept('./redux', () => {
    // eslint-disable-next-line global-require
    const nextRootReducer = require('./redux').reducer
    store.replaceReducer(nextRootReducer)
  })
}
