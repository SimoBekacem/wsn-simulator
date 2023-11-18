import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Stack, TextField, Button } from '@mui/material';

import { generateRandomNetwork } from '../../redux/slices/network.reducer';

export default function CreatingNetworkForm() {
	const dispatch = useDispatch();
	const [values, setvalues] = useState({
		nodesNumber: 8,
		communicationRange: 200,
		clusterHeadsNumber: 4,
	});
	const [info, setinfo] = useState({
		nodesNumber: 8,
		communicationRange: 200,
		clusterHeadsNumber: 5,
	});

	useEffect(() => {
		dispatch(
			generateRandomNetwork({
				numberOfNodes: info.nodesNumber,
				sensorCommunicationRange: info.communicationRange,
				clusterHeadsNumber: info.clusterHeadsNumber,
			})
		);
	}, [info]);

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
	};

	return (
		<Stack spacing={2}>
			<TextField
				id='outlined-number'
				label='Nodes Number'
				type='number'
				defaultValue={info.nodesNumber}
				onChange={(event) => {
					hundleChange(event);
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
