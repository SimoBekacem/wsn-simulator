import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, TextField, Button } from '@mui/material';

import {
	generateNodesRedux,
	generateClusterHeadsAndLinksRedux,
} from '../../redux/slices/network.reducer';

export default function CreatingNetworkForm() {
	const dispatch = useDispatch();
	const [numberOfNodes, setnumberOfNodes] = useState(40);
	const [values, setvalues] = useState({
		communicationRange: 200,
		clusterHeadsNumber: 20,
	});
	const [info, setinfo] = useState({
		communicationRange: 200,
		clusterHeadsNumber: 20,
	});

	useEffect(() => {
		dispatch(
			generateNodesRedux({
				numberOfNodes,
			})
		);
	}, [numberOfNodes]);

	const hundleChangeNumberOfNodes = (event) => {
		setnumberOfNodes(event.target.value);
	};
	const hundleChange = (event) => {
		setvalues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const hundleClick = () => {
		setinfo({
			nodesNumber: values.nodesNumber,
			communicationRange: values.communicationRange,
			clusterHeadsNumber: values.clusterHeadsNumber,
		});
		dispatch(
			generateClusterHeadsAndLinksRedux({
				sensorCommunicationRange: info.communicationRange,
				clusterHeadsNumber: info.clusterHeadsNumber,
				formula: 0,
			})
		);
	};

	return (
		<Stack spacing={2}>
			<TextField
				id='outlined-number'
				label='Nodes Number'
				type='number'
				defaultValue={numberOfNodes}
				onChange={(event) => {
					hundleChangeNumberOfNodes(event);
				}}
				name='nodesNumber'
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				id='outlined-number'
				label='Communication Radius'
				type='number'
				defaultValue={info.communicationRange}
				onChange={(event) => {
					hundleChange(event);
				}}
				name='communicationRange'
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				id='outlined-number'
				label='Cluster Heades Number'
				type='number'
				onChange={(event) => {
					hundleChange(event);
				}}
				name='clusterHeadsNumber'
				defaultValue={info.clusterHeadsNumber}
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<Button variant='contained' onClick={hundleClick}>
				Create The Network
			</Button>
		</Stack>
	);
}
