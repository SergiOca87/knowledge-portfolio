import { CURRENT_USER_QUERY, useUser } from './User';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import UserContext from '../context/UserContext';
import { useContext } from 'react';

//TODO: Do We even need this? We have it all on the user...

export const USER_CATEGORIES_QUERY = gql`
	query USER_CATEGORIES_QUERY($id: ID!) {
		allCategories(where: { author: { id: $id } }) {
			id
			name
			icon
		}
	}
`;

export function getCategories(userId) {
	// const { user } = useContext(UserContext);

	const { data, error, loading } = useQuery(USER_CATEGORIES_QUERY, {
		variables: {
			id: userId,
		},
	});

	if (loading) {
		return <p>Loading...</p>;
	} else {
		return data;
	}
}
