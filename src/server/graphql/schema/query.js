import { objectType, stringArg } from 'nexus'

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.string('hello', {
      args: { name: stringArg({ nullable: true }) },
      resolve: (_, { name }) => `Hello ${name || 'World'}!`,
    })
  },
})
