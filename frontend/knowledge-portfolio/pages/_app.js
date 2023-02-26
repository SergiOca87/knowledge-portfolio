import Layout from '../components/layout/Layout';
import NProgress from 'nprogress';
import '../components/styles/nprogress.css';
import Router, { useRouter } from 'next/router';
import Page from '../components/layout/Page';

import { supabase } from '../utils/supabaseClient';
import { useState } from 'react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { UserProvider } from '../context/userContext';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, serverUser }) {
	const [supabaseClient] = useState(() => createBrowserSupabaseClient());

	const router = useRouter();
	// Listen to auth events:
	// https://supabase.com/docs/reference/javascript/next/auth-onauthstatechange
	supabase.auth.onAuthStateChange((event, session) => {
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
				<SessionContextProvider
					supabaseClient={supabaseClient}
					initialSession={pageProps.initialSession}
				>
					<Page>
						<Component {...pageProps} />
					</Page>
				</SessionContextProvider>
			</UserProvider>
		</>
	);
}

export default MyApp;
