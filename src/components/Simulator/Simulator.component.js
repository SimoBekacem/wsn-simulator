import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

import generateRandomNetwork from '../../utils/generatingRandomNetwork';

const Resaux = () => {
	const network = generateRandomNetwork(90, 150, 20);
	const elements = network.elements;
	const clusterHeads = network.clusterHeads;
	const stylesheet = clusterHeads.map((clusterHead) => {
		return {
			selector: clusterHead,
			style: {
				backgroundColor: 'red',
			},
		};
	});
	return (
		<CytoscapeComponent
			elements={elements}
			zoomingEnabled={false}
			autolock={true}
			zoom={0.75}
			style={{
				width: '100%',
				height: '100%',
			}}
			stylesheet={stylesheet}
		/>
	);
};

export default Resaux;
