import { CURRENT_USER_QUERY, useUser } from './User';
import { useQuery } from '@apollo/client';

import { useContext } from 'react';

export function getCategories(userId) {
	//

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
