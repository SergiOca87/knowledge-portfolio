import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
	query {
		authenticatedItem {
			... on User {
				id
				name
				email
				options
				items {
					id
					title
					date
					description
					status
					singlePageContent
					categories {
						id
						name
						icon
					}
				}
			}
		}
	}
`;

export const SINGLE_USER_QUERY = gql`
	query SINGLE_USER_QUERY($id: ID!) {
		User(where: { id: $id }) {
			name
		}
	}
`;

export function useUser() {
	// const { data } = useQuery(CURRENT_USER_QUERY);
	// const { user, setUser } = useContext(UserContext);
	// data && setUser(data?.authenticatedItem);
}
