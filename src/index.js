import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link'
import { errorLink, authLink, httpLink } from "./helpers/apollo-links"
import Routes from './routes';

import './index.css';

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    errorLink(),
    authLink(),
    httpLink()
  ]),
  cache: new InMemoryCache(),
})

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('app') // eslint-disable-line no-undef
);
/* eslint-disable */
if (typeof module.hot !== 'undefined') {
  module.hot.accept(); // eslint-disable-line
}
