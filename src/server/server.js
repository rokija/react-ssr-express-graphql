import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { getDataFromTree } from 'react-apollo'

import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import { routes } from '../routes'
import graphqlServer from './graphql'
import { errorLink, authLink, httpLink } from '../helpers/apollo-links'

import devConfig from '../../webpack.dev.config.js'
import prodConfig from '../../webpack.prod.config.js'
import AppShell from '../AppShell'

const { ServerStyleSheet, StyleSheetManager } = require('styled-components')

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

const app = express()
const compiler = webpack(config)

graphqlServer.applyMiddleware({ app }) // app is from an existing express app

// render static files from client output
app.use(express.static('../../dist'))

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  }),
)

// hot reloading
if (process.env.NODE_ENV === 'development') {
  app.use(webpackHotMiddleware(compiler))
}

const renderHead = ({ styleTags }) => `
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="keywords" content="add, keywords, for, SEO">
      <meta name="description" content="Page Description">
      <meta name="robots" content="index,follow">
      <title>React Server Side</title>
      ${styleTags}
    </head>
  `

const renderScripts = initialState => {
  const envVars = Object.keys(process.env)
    .filter(key => key.startsWith('REACT_APP'))
    .reduce(
      (vars, key) => Object.assign({}, vars, { [key]: process.env[key] }),
      {},
    )

  return `
      <script>
      window.__APOLLO_STATE__=${JSON.stringify(initialState).replace(
    /</g,
    '\\u003c',
  )};
       </script>
    <script>
      window.env = ${JSON.stringify(envVars)}
    </script>
    <script type="text/javascript" src="/main.js"></script>
  `
}

app.get('/*', (req, res) => {
  // required so params would work in react router (:id)
  const dataRequirements = routes
    .filter(route => matchPath(req.url, route)) // filter matching paths
    .map(route => route.component) // map to components
    .filter(comp => comp.serverFetch) // check if components have data requirement

  const sheet = new ServerStyleSheet()
  const styleTags = sheet.getStyleTags()
  const head = renderHead({ styleTags })

  const apolloClient = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([errorLink(), authLink(), httpLink()]),
    cache: new InMemoryCache(),
  })

  try {
    Promise.all(dataRequirements).then(() => {
      const context = {}

      const jsx = (
        <StaticRouter context={context} location={req.url}>
          <StyleSheetManager sheet={sheet.instance}>
            <AppShell apolloClient={apolloClient} />
          </StyleSheetManager>
        </StaticRouter>
      )

      return getDataFromTree(jsx).then(() => {
        // We are ready to render for real
        const content = ReactDOMServer.renderToString(jsx)
        const initialState = apolloClient.extract()
        const scripts = renderScripts(initialState)

        res.status(200)
        res.send(`
        <!DOCTYPE html>
        <html>
        ${head}
        <body>
            <div id="app">${content}</div>
            ${scripts}
        </body>
        </html>
    `)

        if (context.status === 404) {
          res.status(404)
        }

        res.end()
      })
    })
  } catch (err) {
    console.error('Something went wrong:', err)
    return res.status(500).send('Oops, better luck next time!')
  }
})

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  server.keepAliveTimeout = 0
  console.log(`App listening to  ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})
