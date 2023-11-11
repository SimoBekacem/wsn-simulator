import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { Grid } from '@mui/material';
import Header from './components/Header/Header.component';
import Form from './components/Form/Form.component';
import Resaux from './components/Simulator/Simulator.component';

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
				<Grid item xs={4}>
					<Form />
				</Grid>
				<Grid item xs={8}>
					<Resaux />
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}

export default App;
