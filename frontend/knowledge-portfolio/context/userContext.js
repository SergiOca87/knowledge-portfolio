/* eslint-disable react/react-in-jsx-scope */
import { useState, createContext, useContext, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

const UserStateContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState('');

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
					console.log('user in state', user);
					setUser(user);

					try {
						// const user = supabase.auth.user();
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
				}
				// setIsLoading(false);
			}
		}
		getInitialUser();
	}, []);

	return (
		<UserStateContext.Provider value={{ user, setUser }}>
			{children}
		</UserStateContext.Provider>
	);
};

export const useUserState = () => {
	return useContext(UserStateContext);
};
