import Layout from '../components/layout/Layout';
import NProgress from 'nprogress';
import '../components/styles/nprogress.css';
import Router, { useRouter } from 'next/router';
import Page from '../components/layout/Page';

import { supabase } from '../utils/supabaseClient';
import { UserProvider, useUserState } from '../context/userContext';

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, serverUser }) {
	// Create a new supabase browser client on every first render.
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	const router = useRouter();
	// Listen to auth events:
	// https://supabase.com/docs/reference/javascript/next/auth-onauthstatechange
	supabase.auth.onAuthStateChange((event, session) => {
		if (event === 'PASSWORD_RECOVERY') {
			router.push('/update-user');
		} else if (event === 'SIGNED_IN') {
			console.log('signed in');
		}
	});

	return (
		<>
			<SessionContextProvider
				supabaseClient={supabaseClient}
				initialSession={pageProps.initialSession}
			>
				<Page>
					<Component {...pageProps} />
				</Page>
			</SessionContextProvider>
		</>
	);
}

export default MyApp;
