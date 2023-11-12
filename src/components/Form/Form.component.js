import React from 'react';
import { Stack, TextField } from '@mui/material';

import { formStyle } from './Form.style';

export default function Form() {
	return (
		<Stack spacing={2} p={4} sx={formStyle}>
			<TextField
				id='outlined-number'
				label='Nodes Number'
				type='number'
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				id='outlined-number'
				label='Communication Radius'
				type='number'
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				id='outlined-number'
				label='Cluster Heades Number'
				type='number'
				InputLabelProps={{
					shrink: true,
				}}
			/>
		</Stack>
	);
}
