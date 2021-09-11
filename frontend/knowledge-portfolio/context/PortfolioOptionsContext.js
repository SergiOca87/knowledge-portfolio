/* eslint-disable react/react-in-jsx-scope */
import { useState, createContext, useContext } from 'react';

const PortfolioOptionsContext = createContext();

const palettes = {
	darkPalette1: {
		primary: '#14213dff',
		secondary: '#fca311ff',
		tertiary: '#2b3952',
	},
	darkPalette2: {
		primary: 'red',
		secondary: 'blue',
		tertiary: 'green',
	},
	darkPalette3: [],
	lightPalette1: {
		primary: 'orange',
		secondary: 'yellow',
		tertiary: 'tomato',
	},
	lightPalette2: {
		primary: '#fff',
		secondary: '#fff',
		tertiary: '#fff',
	},
	lightPalette3: [],
};

export const OptionsProvider = ({ children }) => {
	const [options, setOptions] = useState({
		// patterns: patterns,
		palettes: palettes,
		cols: 6,
		fontFamily: 'Montserrat',
		mode: 'dark',
		darkPalette: palettes.darkPalette1,
		lightPalette: palettes.lightPalette1,
		roundEdges: false,
	});
	return (
		<PortfolioOptionsContext.Provider value={{ options, setOptions }}>
			{children}
		</PortfolioOptionsContext.Provider>
	);
};

export default PortfolioOptionsContext;
