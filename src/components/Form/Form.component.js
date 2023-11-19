import React from 'react';
import { Stack, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import CreatingNetworkForm from '../CreatingNetworkForm/CreatingNetworkForm.component';
import BattrieForm from '../BattrieForm/BattrieForm.component';
import { formStyle } from './Form.style';

const Root = styled('div')(({ theme }) => ({
	width: '100%',
	...theme.typography.body2,
	'& > :not(style) ~ :not(style)': {
		marginTop: theme.spacing(2),
	},
}));

export default function Form() {
	return (
		<Stack spacing={2} p={4} sx={formStyle}>
			<Root>
				<Divider>Creating The Network</Divider>
				<CreatingNetworkForm />
			</Root>
		</Stack>
	);
}
