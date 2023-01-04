import React from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { supabase } from '../../utils/supabaseClient';
import { toast } from 'react-toastify';
import { useUserState } from '../../context/userContext';

export default function SignOut() {
	const router = useRouter();

	const handleSignOut = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			toast.error(error);
		} else {
			router.push('/');
		}
	};

	return (
		<Button variant="primary" type="button" onClick={handleSignOut}>
			Sign Out
		</Button>
	);
}
