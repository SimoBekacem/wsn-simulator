function generateRandomNetwork(
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
		};
		nodes.push(node);
	}

	//here we creat the edges or the links between the nodes;
	const edges = [];
	for (let i = 0; i < numberOfNodes; i++) {
		const sourceNode = nodes[i];

		for (let j = 0; j < numberOfNodes; j++) {
			const targetNode = nodes[j];

			if (sourceNode !== targetNode) {
				//: here we have the cordonnations of each point and we calculate the distance between those 2 points
				const deltaX = sourceNode.position.x - targetNode.position.x;
				const deltaY = sourceNode.position.y - targetNode.position.y;
				const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
				if (distance <= sensorCommunicationRange) {
					const edge = {
						data: {
							source: sourceNode.data.id,
							target: targetNode.data.id,
						},
					};

					edges.push(edge);
				}
			}
		}
	}
	const clusterHeadsList = [];

	if (clusterHeadsNumber > numberOfNodes) {
		console.log('this number that you chois is invalid');
	} else {
		for (let i = 0; i <= clusterHeadsNumber; i++) {
			const randomClusterHeads = Math.floor(
				Math.random() * numberOfNodes
			);
			clusterHeadsList.push(`#${nodes[randomClusterHeads].data.id}`);
		}
	}

	return { elements: [...nodes, ...edges], clusterHeads: clusterHeadsList };
}

export default generateRandomNetwork;
