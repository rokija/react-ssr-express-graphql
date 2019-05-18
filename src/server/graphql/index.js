import { ApolloServer } from 'apollo-server-express'
import { makeSchema } from 'nexus'
import path from 'path'
import Context from './graphqlContext'
import * as types from './schema'

const schema = makeSchema({
  nonNullDefaults: {
    output: false,
    input: false,
  },
  types,
  outputs: {
    schema: path.join(
      __dirname,
      '../../../src/server/graphql/generated/schema.graphql',
    ),
  },
})

const context = new Context()

const server = new ApolloServer({
  schema,
  context,
})

export default server
