/* eslint-disable react/react-in-jsx-scope */
import { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const UserStateContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [userCategories, setUserCategories] = useState(null);

	//TODO: Can we use getServerSideProps here? Is it worth it?
	useEffect(() => {
		let mounted = true;
		async function getInitialUser() {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			// const {
			// 	data: { user },
			// } = await supabase.auth.getUser();
			// only update the react state if the component i
			if (mounted) {
				if (user) {
					try {
						// Create a user profile which is publicly accessible
						const updates = {
							id: user.id,
							username: user.email,
							updated_at: new Date(),
						};

						let { error } = await supabase
							.from('profiles')
							.upsert(updates);
						if (error) {
							throw error;
						}
					} catch (error) {
						alert(error.message);
					}

					try {
						let { data: profile, error } = await supabase
							.from('profiles')
							.select('*')
							.eq('id', user.id);

						profile && setUser(profile[0]);

						if (error) {
							throw error;
						}
					} catch (error) {
						alert(error.message);
					}

					try {
						let { data: categories, error } = await supabase
							.from('categories')
							.select('*')
							.eq('userId', user.id);
						setUserCategories(categories);

						console.log(userCategories);
						if (error) {
							throw error;
						}
					} catch (error) {
						alert(error.message);
					}
				}
				// setIsLoading(false);
			}
		}
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
