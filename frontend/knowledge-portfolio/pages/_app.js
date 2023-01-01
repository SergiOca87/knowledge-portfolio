import Layout from '../components/layout/Layout';
import React, { useContext } from 'react';
import NProgress from 'nprogress';
import '../components/styles/nprogress.css';
import Router, { useRouter } from 'next/router';
import Page from '../components/layout/Page';

import { UserProvider } from '../context/userContext';
import { supabase } from '../utils/supabaseClient';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	// Listen to auth events:
	// https://supabase.com/docs/reference/javascript/next/auth-onauthstatechange
	supabase.auth.onAuthStateChange((event, session) => {
		console.log('event', event);
		if (event === 'PASSWORD_RECOVERY') {
			router.push('/update-user');
		} else if (event === 'SIGNED_IN') {
			//TODO: The best would be to add the user to context and then redirect.

			console.log(session);
			router.push(`/portfolio/${session.user.id}`);
		}
	});

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
