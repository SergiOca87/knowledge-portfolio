import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
// import { CURRENT_USER_QUERY } from './User';
import { Router, useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useUserState } from '../../context/userContext';
import { supabase } from '../../utils/supabaseClient';
import { toast } from 'react-toastify';

export default function SignOut() {
	const router = useRouter();
	const { setUser } = useUserState();

	const handleSignOut = async () => {
		const { error } = await supabase.auth.signOut();

		if (error) {
			toast.error(error);
		} else {
			setUser(null);
			router.push('/');
		}
	};

	return (
		<Button variant="primary" type="button" onClick={handleSignOut}>
			Sign Out
		</Button>
	);
}
