import { gql, useQuery } from '@apollo/client';

export const CURRENT_USER_QUERY = gql`
	query {
		authenticatedItem {
			... on User {
				id
				name
				email
			}
		}
	}
`;

export function useUser() {
	const { data } = useQuery(CURRENT_USER_QUERY);

	console.log('user data', data);

	return data?.authenticatedItem;
}
