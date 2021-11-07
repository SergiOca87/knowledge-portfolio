import React from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
	mutation {
		endSession
	}
`;

export default function SignOut() {
	const [signOut] = useMutation(SIGN_OUT_MUTATION, {
		refetchQueries: [{ query: CURRENT_USER_QUERY }],
	});

	const handleSignOut = async () => {
		const res = await signOut();

		//TODO: Redirect
	};

	return (
		<button type="button" onClick={handleSignOut}>
			Sign Out
		</button>
	);
}
