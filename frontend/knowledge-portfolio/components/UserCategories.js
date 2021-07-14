import { CURRENT_USER_QUERY, useUser } from './User';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const USER_CATEGORIES_QUERY = gql`
	query USER_CATEGORIES_QUERY($user: ID!) {
		allCategories(where: { user: { id: $user } }) {
			id
			title
		}
	}
`;

//TODO: Once authentication is set, this should be the current user
const currentUser = "60aa472c93309922d83e8f92";

export function getCategories() {
    const { data, categoryError, categoryLoading } = useQuery(
        USER_CATEGORIES_QUERY,
        {
            variables: {
                user: currentUser
            },
        }
    );

    return data;
}
