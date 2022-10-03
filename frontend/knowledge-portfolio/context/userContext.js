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
