function generateRandomNetworkFunction(
	numberOfNodes,
	sensorCommunicationRange,
	clusterHeadsNumber
) {
	//here we creat the nodes :
	const nodes = [];
	for (let i = 0; i < numberOfNodes; i++) {
		const randomX = Math.floor(Math.random() * 900 + 100);
		const randomY = Math.floor(Math.random() * 700 + 100);
		const node = {
			data: {
				id: `node-${i}`,
				label: `Node ${i}`,
			},
			position: { x: randomX, y: randomY },
			distanceFromClusterHead: null,
			battrieLife: 0,
		};
		nodes.push(node);
	}
	// here we get the cluster heads randomly ;
	const clusterHeadsList = [];
	if (Number(clusterHeadsNumber) > Number(numberOfNodes)) {
		console.log('this number that you chois is invalid');
	} else {
		for (let i = 0; i < clusterHeadsNumber; i++) {
			const randomClusterHeads = Math.floor(
				Math.random() * numberOfNodes
			);
			clusterHeadsList.push(nodes[randomClusterHeads].data.id);
		}
	}
	//here we creat the edges or the links between the nodes;
	const edges = [];
	for (let i = 0; i < Number(numberOfNodes); i++) {
		const sourceNode = nodes[i];

		for (let j = 0; j < Number(numberOfNodes); j++) {
			const targetNode = nodes[j];

			if (sourceNode !== targetNode) {
				//: here we have the cordonnations of each point and we calculate the distance between those 2 points
				const deltaX = sourceNode.position.x - targetNode.position.x;
				const deltaY = sourceNode.position.y - targetNode.position.y;
				const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
				if (Number(distance) <= Number(sensorCommunicationRange)) {
					const edge = {
						data: {
							source: sourceNode.data.id,
							target: targetNode.data.id,
							id: `${sourceNode.data.id}-${targetNode.data.id}`,
						},
					};

					edges.push(edge);
					if (clusterHeadsList.includes(targetNode.data.id)) {
						nodes[i].distanceFromClusterHead = distance;
					}
				}
			}
		}
	}

	// here we style the cluster header to be in a defferante color
	const stylesheetNodes = nodes.map((node) => {
		return {
			selector: `#${node.data.id}`,
			style: {
				backgroundColor: `${
					clusterHeadsList.includes(node.data.id)
						? 'red'
						: node.distanceFromClusterHead
						? 'blue'
						: 'black'
				}`,
				label: `${node.data.id} ${
					clusterHeadsList.includes(node.data.id)
						? 'cluster Heade'
						: 'simple'
				}`,
			},
		};
	});
	// here we style the edeges that are in link with the cluster headers
	const stylesheetEdegs = edges.map((edeg) => {
		return {
			selector: `#${edeg.data.id}`,
			style: {
				width: `${
					clusterHeadsList.includes(edeg.data.source) ||
					clusterHeadsList.includes(edeg.data.target)
						? '5rem'
						: '1rem'
				}`,
				backgroundColor: `${
					clusterHeadsList.includes(edeg.data.source) ||
					clusterHeadsList.includes(edeg.data.target)
						? 'green'
						: 'black'
				}`,
			},
		};
	});

	return {
		elements: [...nodes, ...edges],
		stylesheet: [...stylesheetNodes, ...stylesheetEdegs],
	};
}

export default generateRandomNetworkFunction;
