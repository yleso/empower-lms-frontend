import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
	uri: `${import.meta.env.VITE_API_URL}/graphql`
})

const getAuthLink = (token: string) => {
	return setContext((_, { headers }) => {
		return {
			headers: {
				...headers,
				authorization: !token ? '' : `Bearer ${token}`
			}
		}
	})
}

export const getClient = (token: string) => {
	return new ApolloClient({
		link: getAuthLink(token).concat(httpLink),
		cache: new InMemoryCache()
	})
}