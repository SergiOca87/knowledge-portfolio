import React, { useContext } from 'react';
import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
	query {
		authenticatedItem {
			... on User {
				id
				name
				email
				publicEmail
				options
				linkedin
				instagram
				youtube
				website
				sent {
					id
					text
					receiver {
						id
						name
					}
				}
				received {
					id
					text
					sender {
						id
						name
					}
				}
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

//TODO: single user query need to have the social media data in order to display it on its card.
//TODO: BONUS - Do we need to query the options for personalized user card on the public profiles page?
export const SINGLE_USER_QUERY = gql`
	query SINGLE_USER_QUERY($id: ID!) {
		User(where: { id: $id }) {
			name
			email
			publicEmail
			options
			instagram
			youtube
			website
			categories {
				id
			}
			items {
				id
				title
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
`;

export function useUser() {
	// const { data } = useQuery(CURRENT_USER_QUERY);
	// const { user, setUser } = useContext(UserContext);
	// data && setUser(data?.authenticatedItem);
}
