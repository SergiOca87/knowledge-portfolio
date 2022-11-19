import Layout from '../components/layout/Layout';
import React, { useContext } from 'react';
import NProgress from 'nprogress';
import '../components/styles/nprogress.css';
import Router from 'next/router';
import Page from '../components/layout/Page';
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
// import UserContext, { UserProvider } from '../context/UserContext';
import { UserProvider } from '../context/userContext';
import createUploadLink from 'apollo-upload-client/public/createUploadLink.js';

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
	link: createUploadLink(),
});

function MyApp({ Component, pageProps }) {
	return (
		<>
			<ApolloProvider client={client}>
				<UserProvider>
					<Page>
						<Component {...pageProps} />
					</Page>
				</UserProvider>
			</ApolloProvider>
		</>
	);
}

export default MyApp;
