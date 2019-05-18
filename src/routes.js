import React from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'

import Home from './app/Home'
import Test from './app/Test'

export const routes = [
  {
    key: 'home-page',
    path: '/',
    component: Home,
    exact: true,
  },
  {
    key: 'loading-page',
    path: '/test',
    component: Test,
    exact: true,
  },
]

class Routes extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/test">Test</NavLink>
          </li>
        </ul>
        <Switch>
          {routes.map((route) => {
            const { key, component: Component, ...routeProps } = route
            return (
              <Route
                key={key}
                {...routeProps}
                render={props => <Component {...props} />}
              />
            )
          })}
        </Switch>
      </div>
    )
  }
}

export default Routes
