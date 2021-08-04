import '../styles/globals.css';
import Layout from '../components/Layout';
import React from 'react';

import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql,
} from '@apollo/client';

const client = new ApolloClient({
	uri: 'http://localhost:3000/api/graphql',
	cache: new InMemoryCache(),
});

console.log(client);

function MyApp({ Component, pageProps, apollo }) {
	return (
		<ApolloProvider client={client}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</ApolloProvider>
	);
}

// MyApp.getInitialProps = async function ({ Component, ctx }) {
// 	let pageProps = {};
// 	if (Component.getInitialProps) {
// 		pageProps = await Component.getInitialProps(ctx);
// 	}
// 	pageProps.query = ctx.query;
// 	return { pageProps };
// };

export default MyApp;
