import { supabase } from '../../utils/supabaseClient';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import React from 'react';
import { useRouter } from 'next/router';

//TODO: Change styles: https://supabase.com/docs/guides/auth/auth-helpers/auth-ui

export default function SignInUp() {
	const router = useRouter();

	const App = () => (
		<Auth
			supabaseClient={supabase}
			appearance={{ theme: ThemeSupa }}
			theme="dark"
			providers={['google', 'github']}
		/>
	);

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

	return <App />;
}
