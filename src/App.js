import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Provider } from 'react-redux';

import { Grid } from '@mui/material';
import Header from './components/Header/Header.component';
import Form from './components/Form/Form.component';
import Resaux from './components/Simulator/Simulator.component';
import { store } from './redux/store';

function App() {
	const theme = createTheme({
		palette: {
			mode: 'light',
		},
	});
	return (
		<Provider store={store}>
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
		</Provider>
	);
}

export default App;
