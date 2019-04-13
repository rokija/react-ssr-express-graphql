import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'

export const httpLink = () => createHttpLink({
    uri: 'http://localhost:8080/graphql',
})

export const authLink = () => setContext((_, { headers }) => {
    const access_token = ""
    return {
        headers: {
            ...headers,
            authorization: access_token ? `Bearer ${access_token}` : '',
        },
    }
})

export const errorLink = (logger = console) =>
    onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach(graphqlError => {
                logger.error(graphqlError, '[apollo-error-link] graphql error')
            })
        }

        if (networkError) {
            logger.error(networkError, '[apollo-error-link] networkError')
        }
    })

