import { createSlice } from '@reduxjs/toolkit';
import generateRandomNetworkFunction from '../../utils/generatingRandomNetwork';

const initialState = {
	value: {
		elements: [],
		stylesheet: [],
	},
};

export const networkSlice = createSlice({
	name: 'network',
	initialState,
	reducers: {
		generateRandomNetwork: (state, action) => {
			const {
				numberOfNodes,
				sensorCommunicationRange,
				clusterHeadsNumber,
			} = action.payload;
			const network = generateRandomNetworkFunction(
				numberOfNodes,
				sensorCommunicationRange,
				clusterHeadsNumber
			);
			state.value.elements = network.elements;
			state.value.stylesheet = network.stylesheet;
		},
	},
});

// Action creators are generated for each case reducer function
export const { generateRandomNetwork } = networkSlice.actions;

export default networkSlice.reducer;
