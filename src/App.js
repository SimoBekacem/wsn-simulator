import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Resaux from './test';
import { Grid } from '@mui/material';
import Header from './components/Header/Header.component';

function App() {
	const theme = createTheme({
		palette: {
			mode: 'light',
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Grid container>
				<Grid item xs={12}>
					<Header />
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}

export default App;
