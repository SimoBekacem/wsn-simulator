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
			battrieLife: 100,
			numberIsNotCluster: 0,
			clusterhead: null,
		};
		nodes.push(node);
	}
	return nodes;
}

function generateClusterHeadsAndLinks(
	nodes,
	sensorCommunicationRange,
	clusterHeadsPorsentag,
	isRelection
) {
	let numberOfNodes = 0;
	for (let i = 0; i < nodes.length; i++) {
		if (nodes[i].battrieLife > 0) {
			numberOfNodes++;
		}
	}
	console.log(numberOfNodes);
	const clusterHeadsNumber = Math.floor(
		(clusterHeadsPorsentag * numberOfNodes) / 100
	);
	// here we get the cluster heads randomly ;
	const clusterHeadsList = [];
	if (!isRelection) {
		if (Number(clusterHeadsNumber) > Number(numberOfNodes)) {
			console.log('this number that you chois is invalid');
		} else {
			const selectedIndices = new Set(); // To keep track of selected indices
			for (let i = 0; i < clusterHeadsNumber; i++) {
				let randomClusterHeads;
				do {
					randomClusterHeads = Math.floor(
						Math.random() * numberOfNodes
					);
				} while (selectedIndices.has(randomClusterHeads));
				selectedIndices.add(randomClusterHeads);
				nodes[randomClusterHeads].isClusterHead = true;
				nodes[randomClusterHeads].numberIsNotCluster = 0;
				clusterHeadsList.push(nodes[randomClusterHeads]);
			}
		}
	} else {
		const wasClusterHeade = [];
		nodes.forEach((node) => {
			if (node.isClusterHead) {
				wasClusterHeade.push(node.data.id);
				node.isClusterHead = false;
			}
			node.distanceFromClusterHead = null;
			node.isClusterHead = false;
			node.hasClusterHead = false;
			node.clusterhead = null;
		});
		const selectedIndices = new Set(); // To keep track of selected indices
		for (let i = 0; i < clusterHeadsNumber; i++) {
			let randomClusterHeads;
			do {
				randomClusterHeads = Math.floor(Math.random() * numberOfNodes);
			} while (
				nodes[randomClusterHeads].battrieLife >= 35 &&
				selectedIndices.has(randomClusterHeads) &&
				wasClusterHeade.includes(nodes[randomClusterHeads].data.id)
			);
			selectedIndices.add(randomClusterHeads);
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
				nodes[i].clusterhead = targetNode.data.id;
			}
		}
	};

	const edges = [];
	for (let i = 0; i < numberOfNodes; i++) {
		const sourceNode = nodes[i];
		if (sourceNode.battrieLife > 0) {
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
	}
	for (let j = 0; j < clusterHeadsList.length; j++) {
		const sourceClusterNode = clusterHeadsList[j];
		for (let i = 0; i < clusterHeadsList.length; i++) {
			const targetClusterNode = clusterHeadsList[i];
			const distance = calculateDistanc(
				sourceClusterNode,
				targetClusterNode
			).distance;
			if (
				sourceClusterNode !== targetClusterNode &&
				distance <= sensorCommunicationRange
			) {
				const edge = {
					data: {
						source: sourceClusterNode.data.id,
						target: targetClusterNode.data.id,
						id: `${sourceClusterNode.data.id}-${targetClusterNode.data.id}`,
					},
				};

				edges.push(edge);
			}
		}
	}

	// here we style the cluster header to be in a defferante color
	const stylesheetNodes = styleNodes(nodes, clusterHeadsList);
	return {
		nodes,
		edges,
		stylesheetNodes,
	};
}

function decresingBattrieLife(nodes) {
	nodes.map((node) => {
		if (node.battrieLife >= 35) {
			node.isClusterHead
				? (node.battrieLife -= 25)
				: (node.battrieLife -= 15);
		} else {
			node.battrieLife = 0;
		}
	});
	return nodes;
}

function styleNodes(nodes, clusterHeadsList) {
	const stylesheetNodes = nodes.map((node) => {
		return {
			selector: `#${node.data.id}`,
			style: {
				backgroundColor: `${
					node.isClusterHead
						? 'red'
						: node.distanceFromClusterHead
						? 'green'
						: node.battrieLife
						? 'blue'
						: 'black'
				}`,
				label: `${node.data.id} ${
					clusterHeadsList.includes(node) ? 'cluster Heade' : 'simple'
				}`,
			},
		};
	});
	return stylesheetNodes;
}

export { generateNodes, generateClusterHeadsAndLinks, decresingBattrieLife };
