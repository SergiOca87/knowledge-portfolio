import Layout from '../components/layout/Layout';
import React, { useContext } from 'react';
import NProgress from 'nprogress';
import '../components/styles/nprogress.css';
import Router from 'next/router';
import Page from '../components/layout/Page';

import { UserProvider } from '../context/userContext';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
	return (
		<>
			<UserProvider>
				<Page>
					<Component {...pageProps} />
				</Page>
			</UserProvider>
		</>
	);
}

export default MyApp;
