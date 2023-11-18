function generateRandomNetworkFunction(
	numberOfNodes,
	sensorCommunicationRange,
	clusterHeadsNumber
) {
	//here we creat the nodes :
	const nodes = [];
	for (let i = 0; i < numberOfNodes; i++) {
		const randomX = Math.floor(Math.random() * 1000 + 30);
		const randomY = Math.floor(Math.random() * 800 + 30);
		const node = {
			data: {
				id: `node-${i}`,
				label: `Node ${i}`,
			},
			position: { x: randomX, y: randomY },
			distanceFromClusterHead: null,
			isClusterHead: false,
			hasClusterHead: false,
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
			nodes[randomClusterHeads].isClusterHead = true;
			clusterHeadsList.push(nodes[randomClusterHeads]);
		}
	}
	//here we creat the edges or the links between the nodes;
	const creatingLink = (sourceNode, targetNode, i) => {
		//: here we have the cordonnations of each point and we calculate the distance between those 2 points
		const deltaX = sourceNode.position.x - targetNode.position.x;
		const deltaY = sourceNode.position.y - targetNode.position.y;
		const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
		if (distance <= sensorCommunicationRange) {
			const edge = {
				data: {
					source: sourceNode.data.id,
					target: targetNode.data.id,
					id: `${sourceNode.data.id}-${targetNode.data.id}`,
				},
			};

			edges.push(edge);
			if (clusterHeadsList.includes(targetNode)) {
				nodes[i].distanceFromClusterHead = distance;
			}
		}
	};
	console.log(clusterHeadsList);
	const edges = [];
	for (let i = 0; i < numberOfNodes; i++) {
		const sourceNode = nodes[i];
		for (let j = 0; j < clusterHeadsList.length; j++) {
			const targetNode = clusterHeadsList[j];
			if (sourceNode !== targetNode) {
				creatingLink(sourceNode, targetNode, i);
			}
		}
	}

	// here we style the cluster header to be in a defferante color
	const stylesheetNodes = nodes.map((node) => {
		return {
			selector: `#${node.data.id}`,
			style: {
				backgroundColor: `${
					node.isClusterHead
						? 'red'
						: node.distanceFromClusterHead
						? 'blue'
						: 'black'
				}`,
				label: `${node.data.id} ${
					clusterHeadsList.includes(node) ? 'cluster Heade' : 'simple'
				}`,
			},
		};
	});
	// here we style the edeges that are in link with the cluster headers
	const stylesheetEdegs = edges.map((edeg) => {
		return {
			selector: `#${edeg.data.id}`,
			style: {
				width: `5rem`,
			},
		};
	});

	return {
		elements: [...nodes, ...edges],
		stylesheet: [...stylesheetNodes, ...stylesheetEdegs],
	};
}

export default generateRandomNetworkFunction;
