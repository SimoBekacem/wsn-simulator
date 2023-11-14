import React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { useSelector } from 'react-redux';

const Resaux = () => {
	const network = useSelector((state) => state.network.value);
	const elements = network.elements;
	const stylesheet = network.stylesheet;

	return (
		<CytoscapeComponent
			elements={elements}
			zoomingEnabled={false}
			autolock={true}
			zoom={0.75}
			style={{
				width: '100%',
				height: '100%',
				label: 'center',
			}}
			stylesheet={stylesheet}
		/>
	);
};

export default Resaux;
