import Layout from '../components/Layout';
import React, { useContext } from 'react';
import NProgress from 'nprogress';
import '../components/styles/nprogress.css';
import Router from 'next/router';
import Page from '../components/Page';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	useQuery,
	gql,
	createHttpLink,
} from '@apollo/client';
import PortfolioOptionsContext, {
	OptionsProvider,
} from '../context/PortfolioOptionsContext';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

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
		<>
			<ApolloProvider client={client}>
				<OptionsProvider>
					<Page>
						<Component {...pageProps} />
					</Page>
				</OptionsProvider>
			</ApolloProvider>
		</>
	);
}

export default MyApp;
