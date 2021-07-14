import '../styles/globals.css';
import Layout from '../components/Layout';
// import { ApolloProvider } from '@apollo/client';
// import withData from '../lib/withData';
// import { ApolloClient } from '@apollo/client/core';
// import { InMemoryCache } from '@apollo/client/cache';
// import { HttpLink } from '@apollo/client';

// What's the corret URI?
// const client = new ApolloClient({
// 	cache: new InMemoryCache(),
// 	uri: 'http://localhost:3000/graphql',
// });

import withApollo from 'next-with-apollo';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

const App = ({ Component, pageProps, apollo }) => (
	<ApolloProvider client={apollo}>
		<Layout>
			<Component {...pageProps} />
		</Layout>
	</ApolloProvider>
);

export default withApollo(({ initialState }) => {
	return new ApolloClient({
		uri: 'http://localhost:5000/admin/api',
		cache: new InMemoryCache().restore(initialState || {}),
	});
})(App);
