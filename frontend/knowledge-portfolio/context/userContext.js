/* eslint-disable react/react-in-jsx-scope */
import { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const UserStateContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [userCategories, setUserCategories] = useState(null);

	useEffect(() => {
		const getInitialUser = async () => {
			try {
				const { data: user } = await supabase.auth.getUser();
				if (user) {
					// Create a user profile which is publicly accessible
					const updates = {
						id: user.id,
						username: user.email,
						updated_at: new Date(),
					};

					let { error: profileError } = await supabase
						.from('profiles')
						.upsert(updates);

					if (profileError) {
						throw profileError;
					}

					let { data: profile, error: profileFetchError } =
						await supabase
							.from('profiles')
							.select('*')
							.eq('id', user.id);

					profile && setUser(profile[0]);

					if (profileFetchError) {
						throw profileFetchError;
					}

					let { data: categories, error: categoriesFetchError } =
						await supabase
							.from('categories')
							.select('*')
							.eq('userId', user.id);

					setUserCategories(categories);

					if (categoriesFetchError) {
						throw categoriesFetchError;
					}
				}
			} catch (error) {
				// Handle the error, display it on the UI, or log it
				console.error('Error:', error.message);
			}
		};

		getInitialUser();
	}, []);

	return (
		<UserStateContext.Provider
			value={{ user, setUser, userCategories, setUserCategories }}
		>
			{children}
		</UserStateContext.Provider>
	);
};

export const useUserState = () => {
	return useContext(UserStateContext);
};
