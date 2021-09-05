import { CURRENT_USER_QUERY, useUser } from './User';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import UserContext from '../context/UserContext';
import { useContext } from 'react';

export const USER_CATEGORIES_QUERY = gql`
	query USER_CATEGORIES_QUERY($id: ID!) {
		allCategories(where: { author: { id: $id } }) {
			id
			name
		}
	}
`;

//TODO: Once authentication is set, this should be the current user
export function getCategories() {
	const { user } = useContext(UserContext);

	const { data, error, loading } = useQuery(USER_CATEGORIES_QUERY, {
		variables: {
			id: user?.id,
		},
	});

	if (loading) {
		return <p>Loading...</p>;
	} else {
		return data;
	}
}
