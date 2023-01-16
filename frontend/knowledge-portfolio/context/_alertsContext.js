import { useState, createContext, useContext, useEffect } from 'react';

const alertsContext = createContext();

export const alertsProvider = ({ children }) => {
	const [alert, setAlert] = useState(null);

	return (
		<AlertsContextProvider.Provider value={(alert, setAlert)}>
			{children}
		</AlertsContextProvider.Provider>
	);
};

export const useAlertsState = () => {
	return usecontext(alertsContext);
};
