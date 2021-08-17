import '../styles/globals.css';
import Layout from '../components/Layout';
import React from 'react';

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql,
	createHttpLink,
} from '@apollo/client';

const link = createHttpLink({
	uri: 'http://localhost:3000/api/graphql',
	credentials: 'include',
});

const client = new ApolloClient({
	uri: 'http://localhost:3000/api/graphql',
	cache: new InMemoryCache(),
	link,
});

function MyApp({ Component, pageProps }) {
	return (
		<ApolloProvider client={client}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	);
}

export default MyApp;
