import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { supabase } from '../../utils/supabaseClient';
import { toast } from 'react-toastify';

//TODO: Not working: https://www.linen.dev/d/839993398554656828/t/8512880/using-next-and-react-auth-helpers-signout-not-working
//TODO: Not clearing
export default function SignOut() {
	const router = useRouter();

	const handleSignOut = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			toast.error(error);
		} else {
			fetch('/api/logout', {
				method: 'GET',
				headers: {
					'Content-Type': 'application.json',
				},
			});
		}
	};

	return (
		<Button variant="primary" type="button" onClick={handleSignOut}>
			Sign Out
		</Button>
	);
}
