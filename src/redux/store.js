import { configureStore } from '@reduxjs/toolkit';
import networkReducer from './slices/network.reducer';

export const store = configureStore({
	reducer: {
		network: networkReducer,
	},
});
