function generateNodes(numberOfNodes) {
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
			numberIsNotCluster: 0,
		};
		nodes.push(node);
	}
	return nodes;
}

function generateClusterHeadsAndLinks(
	nodes,
	sensorCommunicationRange,
	clusterHeadsNumber,
	formula
) {
	const numberOfNodes = nodes.length;
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
			nodes[randomClusterHeads].numberIsNotCluster = 0;
			clusterHeadsList.push(nodes[randomClusterHeads]);
		}
	}

	// this function calculate the distance between two nodes
	const calculateDistanc = (sourceNode, targetNode) => {
		//: here we have the cordonnations of each point and we calculate the distance between those 2 points
		const deltaX = sourceNode.position.x - targetNode.position.x;
		const deltaY = sourceNode.position.y - targetNode.position.y;
		const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
		return { distance, targetNode };
	};

	//here we creat the edges or the links between the nodes;
	const creatingLink = (sourceNode, targetNode, i) => {
		const distance = calculateDistanc(sourceNode, targetNode).distance;
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

	const edges = [];
	for (let i = 0; i < numberOfNodes; i++) {
		const sourceNode = nodes[i];
		let clusterNode = clusterHeadsList[0];
		let infoTargetSource = calculateDistanc(sourceNode, clusterNode);
		for (let j = 1; j < clusterHeadsList.length; j++) {
			const targetNode = clusterHeadsList[j];
			const newInfoTargetSource = calculateDistanc(
				sourceNode,
				targetNode
			);
			if (infoTargetSource.distance >= newInfoTargetSource.distance) {
				infoTargetSource = newInfoTargetSource;
			}
		}
		if (sourceNode !== infoTargetSource.targetNode) {
			creatingLink(sourceNode, infoTargetSource.targetNode, i);
			sourceNode.numberIsNotCluster++;
			sourceNode.hasClusterHead = true;
		}
	}
	for (let j = 0; j < clusterHeadsList.length; j++) {
		const sourceClusterNode = clusterHeadsList[j];
		for (let i = 0; i < clusterHeadsList.length; i++) {
			const targetClusterNode = clusterHeadsList[i];
			if (sourceClusterNode !== targetClusterNode) {
				creatingLink(sourceClusterNode, targetClusterNode, j);
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
	return {
		nodes,
		edges,
		stylesheetNodes,
	};
}

export { generateNodes, generateClusterHeadsAndLinks };
