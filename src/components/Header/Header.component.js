import * as React from 'react';

import { Stack, Typography, Toolbar, Box, AppBar } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import { play_pouseStyle } from './Header.style';

export default function Header() {
	const [isPlay, setisPlay] = React.useState(false);
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Stack
						direction={'row'}
						justifyContent={'space-between'}
						alignItems={'center'}
						width={'100%'}
					>
						<Typography
							variant='h6'
							color='inherit'
							component='div'
						>
							Bah-3
						</Typography>
						<Typography
							variant='h4'
							color='inherit'
							component='div'
						>
							16:45
						</Typography>
						<Box
							onClick={() => {
								setisPlay(!isPlay);
							}}
						>
							{isPlay ? (
								<PauseCircleIcon sx={play_pouseStyle} />
							) : (
								<PlayArrowIcon sx={play_pouseStyle} />
							)}
						</Box>
					</Stack>
				</Toolbar>
			</AppBar>
		</Box>
	);
}