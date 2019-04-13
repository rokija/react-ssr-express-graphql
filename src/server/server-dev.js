import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';

import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import Routes, { routes } from "../routes"
import graphqlServer from "./graphql"

import config from '../../webpack.dev.config.js';

const app = express(),
  compiler = webpack(config);

graphqlServer.applyMiddleware({ app }); // app is from an existing express app

// render static files from client output
app.use(express.static('../../dist'));

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

// hot reloading
app.use(webpackHotMiddleware(compiler));

app.get('/*', (req, res) => {
  const context = {};

  // required so params would work in react router (:id)
  const dataRequirements =
    routes
      .filter(route => matchPath(req.url, route)) // filter matching paths
      .map(route => route.component) // map to components
      .filter(comp => comp.serverFetch) // check if components have data requirement

  try {
    Promise.all(dataRequirements).then(() => {
      const jsx = (
        <StaticRouter context={context} location={req.url}>
          <Routes />
        </StaticRouter>
      );
      const app = ReactDOMServer.renderToString(jsx);


      return res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>React SSR Express Graphql</title>
        </head>

        <body>
            <div id="app">${app}</div>
            <script type="text/javascript" src="/main.js"></script>
        </body>
        </html>
    `)
    });

    if (context.status === 404) {
      res.status(404);
    }
  } catch (err) {
    console.error('Something went wrong:', err);
    return res.status(500).send('Oops, better luck next time!');
  }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening to  ${PORT}....`);
  console.log('Press Ctrl+C to quit.');
});

