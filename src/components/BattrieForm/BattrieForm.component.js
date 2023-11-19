import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
	const [age, setAge] = React.useState('');

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
		<Box sx={{ minWidth: 150 }}>
			<FormControl fullWidth>
				<InputLabel id='demo-simple-select-label'>Formule</InputLabel>
				<Select
					labelId='demo-simple-select-label'
					id='demo-simple-select'
					value={age}
					label='Age'
					onChange={handleChange}
				>
					<MenuItem value={10}>
						<img
							src={require('../../assets/Screenshot 2023-11-19 at 12.01.17.png')}
							width={'300rem'}
						/>
					</MenuItem>
					<MenuItem value={20}>
						<img
							src={require('../../assets/Screenshot 2023-11-19 at 12.01.22.png')}
							width={'300rem'}
						/>
					</MenuItem>
					<MenuItem value={30}>
						<img
							src={require('../../assets/Screenshot 2023-11-19 at 12.01.29.png')}
							width={'300rem'}
						/>
					</MenuItem>
				</Select>
			</FormControl>
		</Box>
	);
}
