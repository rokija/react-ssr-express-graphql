import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { errorLink, authLink, httpLink } from './helpers/apollo-links'
import AppShell from './AppShell'

const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink(), authLink(), httpLink()]),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
})

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate

renderMethod(
  <BrowserRouter>
    <AppShell apolloClient={apolloClient} />
  </BrowserRouter>,
  document.getElementById('app'), // eslint-disable-line no-undef
)
/* eslint-disable */
if (typeof module.hot !== "undefined") {
  module.hot.accept() // eslint-disable-line
}
