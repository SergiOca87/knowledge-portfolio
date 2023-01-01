import { supabase } from '../../utils/supabaseClient';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import React from 'react';
import { useRouter } from 'next/router';

//TODO: Change styles: https://supabase.com/docs/guides/auth/auth-helpers/auth-ui

export default function SignInUp() {
	const App = () => (
		<Auth
			supabaseClient={supabase}
			appearance={{ theme: ThemeSupa }}
			theme="dark"
			providers={['google', 'github']}
		/>
	);

	return <App />;
}
