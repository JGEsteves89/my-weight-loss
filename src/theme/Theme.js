import { createTheme } from '@mui/material/styles';

const themeOptions = {
	palette: {
		mode: 'dark',
		primary: {
			main: '#00c1d2',
		},
		background: {
			default: '#111111',
			paper: '#212121',
		},
		secondary: {
			main: '#d2a01d',
		},
	},
	typography: {
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		h1: {
			fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		},
		h2: {
			fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		},
		h3: {
			fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		},
		h4: {
			fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		},
		h6: {
			fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		},
		h5: {
			fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		},
		subtitle1: {
			fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		},
		subtitle2: {
			fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		},
		button: {
			fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
			fontWeight: 900,
		},
		overline: {
			fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		},
	},
};
const theme = createTheme(themeOptions);
export default theme;
