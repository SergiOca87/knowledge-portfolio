import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
// import { CURRENT_USER_QUERY } from './User';
import { Router, useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useUserState } from '../../context/userContext';

const SIGN_OUT_MUTATION = gql`
	mutation {
		endSession
	}
`;

export default function SignOut() {
	const router = useRouter();
	const { user, setUser } = useUserState();

	const [signOut] = useMutation(SIGN_OUT_MUTATION);

	const handleSignOut = async () => {
		const res = await signOut();

		setUser('');

		//TODO: Proper redirect? How?
		router.push(`/login/`);
	};

	return (
		<Button variant="primary" type="button" onClick={handleSignOut}>
			Sign Out
		</Button>
	);
}
