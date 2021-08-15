import { gql, useQuery } from '@apollo/client';
import userEvent from '@testing-library/user-event';
import { useEffect, useState } from 'react';

const CURRENT_USER_QUERY = gql`
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
	const { data, loading, error } = useQuery(CURRENT_USER_QUERY);

	return data?.authenticatedItem;
}

export { CURRENT_USER_QUERY };
