import { createSlice } from '@reduxjs/toolkit';
import {
	generateNodes,
	generateClusterHeadsAndLinks,
} from '../../utils/generatingRandomNetwork';

const initialState = {
	value: {
		elements: [],
		nodes: [],
		stylesheet: [],
		nodeNumber: null,
	},
};

export const networkSlice = createSlice({
	name: 'network',
	initialState,
	reducers: {
		generateNodesRedux: (state, action) => {
			const numberOfNodes = action.payload.numberOfNodes;
			const nodes = generateNodes(numberOfNodes);
			state.value.nodes = nodes;
			state.value.elements = [...nodes];
			state.value.nodeNumber = numberOfNodes;
		},
		generateClusterHeadsAndLinksRedux: (state, action) => {
			const { sensorCommunicationRange, clusterHeadsNumber } =
				action.payload;
			if (sensorCommunicationRange !== 0 && clusterHeadsNumber !== 0) {
				const oldNodes = state.value.nodes;
				const { nodes, edges, stylesheetNodes } =
					generateClusterHeadsAndLinks(
						oldNodes,
						sensorCommunicationRange,
						clusterHeadsNumber
					);
				state.value.stylesheet = [...stylesheetNodes];
				state.value.elements = [...nodes, ...edges];
			}
		},
		relectionClusterHeadsAndLinksRedux: (state, action) => {
			const { sensorCommunicationRange, clusterHeadsNumber } =
				action.payload;
			if (sensorCommunicationRange !== 0 && clusterHeadsNumber !== 0) {
				const oldNodes = state.value.nodes;
				const isRelection = true;
				const { nodes, edges, stylesheetNodes } =
					generateClusterHeadsAndLinks(
						oldNodes,
						sensorCommunicationRange,
						clusterHeadsNumber,
						isRelection
					);
				state.value.stylesheet = [...stylesheetNodes];
				state.value.elements = [...nodes, ...edges];
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	generateNodesRedux,
	generateClusterHeadsAndLinksRedux,
	relectionClusterHeadsAndLinksRedux,
} = networkSlice.actions;

export default networkSlice.reducer;
