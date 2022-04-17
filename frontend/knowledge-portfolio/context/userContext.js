/* eslint-disable react/react-in-jsx-scope */
import { useState, createContext, useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';

const UserStateContext = createContext();

const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		authenticateUserWithPassword(email: $email, password: $password) {
			... on UserAuthenticationWithPasswordSuccess {
				item {
					id
					name
					email
					options
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
			... on UserAuthenticationWithPasswordFailure {
				message
			}
		}
	}
`;

export const LOGGED_IN_USER = gql`
	query {
		authenticatedItem {
			... on User {
				id
				name
				email
				publicEmail
				options
				instagram
				youtube
				website
				received {
					id
				}
				categories {
					id
					name
					icon
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
	}
`;

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
				name
				icon
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

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState('');

	return (
		<UserStateContext.Provider value={{ user, setUser }}>
			{children}
		</UserStateContext.Provider>
	);
};

export const useUserState = () => {
	return useContext(UserStateContext);
};
