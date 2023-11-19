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
		communicationRange: 0,
		clusterHeadsNumber: 0,
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
		setvalues((prevValue) => ({
			...prevValue,
			[event.target.name]: Number(event.target.value),
		}));
	};

	const hundleClick = () => {
		dispatch(
			generateClusterHeadsAndLinksRedux({
				sensorCommunicationRange: values.communicationRange,
				clusterHeadsNumber: values.clusterHeadsNumber,
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
				defaultValue={values.communicationRange}
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
				defaultValue={values.clusterHeadsNumber}
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
