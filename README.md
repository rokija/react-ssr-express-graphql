# React Server Side Rendering + GraphQL boilerplate

This boilerplate implements **hot reloading** for changes in client side, but if the change is made in server it needs to be restarted (for example generate new schema for graphql if it needs to be updated).

For **CSS** styled components are added because they can be nicely integrated in server side, so there are no css conflicts between what is rendered from server and what from client. also there are no css conflicts if there are no classNames, styled components are completely scoped inside each component. If tests are added, styled components' css can be tested easily.

**Nexus** is used for nicer graphQL schema implementation - it combines schema definition and resolvers in one place.

#### Main Technologies used:

  - React.JS
  - Express.JS
  - Webpack 4
  - Babel 7
  - GraphQL
  - Nexus
  - Apollo
  - Styled Components
  - Eslint
  - React Router DOM


#### Run project locally:

`npm i`
and then 
`npm run dev`

on `localhost:8080` the React app is running, but on `localhost:8080/graphql` graphql queries can be inspected in graphql playground.
