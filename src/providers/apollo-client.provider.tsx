import { FC, PropsWithChildren } from 'react'
import { useAuth } from '@/hooks/useAuth.hook'
import { ApolloProvider } from '@apollo/client'
import { getClient } from '@/store/apollo-client'

const ApolloClientProvider: FC<PropsWithChildren> = ({ children }) => {
	const { jwt } = useAuth()
	
	return <ApolloProvider client={getClient(jwt)}>{children}</ApolloProvider>
}

export default ApolloClientProvider