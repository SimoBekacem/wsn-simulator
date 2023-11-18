import React, { useState, useEffect } from 'react';
import { Stack, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';

// import { changeBattrieLife } from '../../redux/slices/network.reducer';

export default function BattrieForm() {
	const dispatch = useDispatch();
	const [values, setvalues] = useState({
		P: 0.2,
		r: 0.1,
	});

	const [info, setinfo] = useState({
		P: 0.2,
		r: 0.1,
	});

	// useEffect(() => {
	// 	dispatch(
	// 		changeBattrieLife({
	// 			P: info.P,
	// 			r: info.r,
	// 		})
	// 	);
	// });
	const hundleChange = (event) => {
		setvalues({
			...values,
			[event.target.name]: event.target.value,
		});
	};

	const hundleClick = () => {
		setinfo({
			P: values.P,
			r: values.r,
		});
	};
	return (
		<Stack spacing={2}>
			<TextField
				id='outlined-number'
				label='probabilité de retransmette'
				type='number'
				defaultValue={info.P}
				onChange={(event) => {
					hundleChange(event);
				}}
				name='P'
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				id='outlined-number'
				label='taux de perte'
				type='number'
				defaultValue={info.r}
				onChange={(event) => {
					hundleChange(event);
				}}
				name='r'
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<Button variant='contained' onClick={hundleClick}>
				Submit
			</Button>
		</Stack>
	);
}
