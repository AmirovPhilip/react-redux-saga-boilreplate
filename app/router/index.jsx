import React from 'react'
import { Switch, Route } from 'react-router'
import { Home } from '../containers/Home'

export const Router = () => (
  <div>
    <Switch>
      <Route path="/" component={Home} />
    </Switch>
  </div>
)
