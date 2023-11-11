import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

import generateRandomNetwork from '../../utils/generatingRandomNetwork';

const Resaux = () => {
	const elements = generateRandomNetwork(100);
	console.log(
		'🚀 ~ file: Simulator.component.js:8 ~ Resaux ~ elements :',
		elements
	);

	return (
		<CytoscapeComponent
			elements={elements}
			style={{ width: '100%', height: '100%' }}
		/>
	);
};

export default Resaux;
