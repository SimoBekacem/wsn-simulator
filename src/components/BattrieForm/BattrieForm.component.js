import React, { useState } from 'react';
import { Stack, TextField, Button } from '@mui/material';

export default function BattrieForm() {
	const [values, setvalues] = useState({
		nodesNumber: 50,
		communicationRange: 200,
		clusterHeadsNumber: 20,
	});
	const [info, setinfo] = useState({
		nodesNumber: 50,
		communicationRange: 200,
		clusterHeadsNumber: 20,
	});
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
				label='E_max'
				type='number'
				defaultValue={info.nodesNumber}
				onChange={(event) => {
					hundleChange(event);
				}}
				name='E_max'
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				id='outlined-number'
				label='Cluster head Prosontage'
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