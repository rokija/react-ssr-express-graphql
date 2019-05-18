import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { ApolloProvider } from 'react-apollo'
import ThemeProvider from './theme/ThemeProvider'
import GlobalStyle from './theme/globalStyles'
import Routes from './routes'

const AppShell = ({ apolloClient }) => (
  <ApolloProvider client={apolloClient}>
    <ThemeProvider>
      <div className="app-shell-component">
        <Fragment>
          <GlobalStyle />
          <Routes />
        </Fragment>
      </div>
    </ThemeProvider>
  </ApolloProvider>
)

AppShell.propTypes = {
  apolloClient: PropTypes.any,
}

export default AppShell
