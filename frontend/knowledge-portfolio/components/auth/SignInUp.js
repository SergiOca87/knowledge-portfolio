import { supabase } from '../../utils/supabaseClient';
import { Auth } from '@supabase/auth-ui-react';

import React from 'react';

export default function SignInUp() {
	const App = () => <Auth supabaseClient={supabase} />;

	// Listen to auth events:
	// https://supabase.com/docs/reference/javascript/next/auth-onauthstatechange
	supabase.auth.onAuthStateChange((event, session) => {
		console.log('auth event', event, session);
	});

	return <App />;
}
