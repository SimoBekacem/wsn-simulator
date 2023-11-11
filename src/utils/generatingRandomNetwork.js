function generateRandomNetwork(numberOfNodes) {
	const nodes = [];
	for (let i = 0; i < numberOfNodes; i++) {
		const randomX = Math.floor(Math.random() * 700 + 100);
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

	const edges = [];
	for (let i = 0; i < numberOfNodes - 1; i++) {
		const sourceNode = nodes[i];
		const targetNode = nodes[i + 1];
		const edge = {
			data: {
				source: sourceNode.data.id,
				target: targetNode.data.id,
			},
		};
		edges.push(edge);
	}

	return [...nodes, ...edges];
}

export default generateRandomNetwork;
