import React, { useState, useEffect } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { useSelector } from 'react-redux';

const Resaux = () => {
	const network = useSelector((state) => state.network.value);
	const originalElements = network.elements;
	const [elements, setElements] = useState([...originalElements]);
	console.log(
		'🚀 ~ file: Simulator.component.js:9 ~ Resaux ~ elements:',
		elements
	);
	const stylesheet = network.stylesheet;
	const [forceUpdate, setForceUpdate] = useState(false);

	useEffect(() => {
		setElements([...network.elements]);
		setForceUpdate((prev) => !prev);
	}, [network.elements]);

	return (
		<CytoscapeComponent
			key={forceUpdate}
			elements={[...elements]}
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
