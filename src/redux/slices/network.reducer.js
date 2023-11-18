import { createSlice } from '@reduxjs/toolkit';
import generateRandomNetworkFunction from '../../utils/generatingRandomNetwork';

const initialState = {
	value: {
		elements: [],
		stylesheet: [],
		nodeNumber: null,
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
			console.log(network.elements);
			state.value.elements = network.elements;
			state.value.stylesheet = network.stylesheet;
			state.value.nodeNumber = numberOfNodes;
		},
		changeBattrieLife: (state, action) => {
			for (let i = 0; i < state.value.nodeNumber; i++) {
				if (state.value.elements[i].distanceFromClusterHead) {
					const { P, r } = action.payload;
					const t = P / (1 - P * (r % (1 / P)));
					state.value.elements[i].battrieLife = t;
					console.log(t);
				}
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const { generateRandomNetwork, changeBattrieLife } =
	networkSlice.actions;

export default networkSlice.reducer;
