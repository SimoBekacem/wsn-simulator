import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stack, Typography, Toolbar, Box, AppBar, Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { relectionClusterHeadsAndLinksRedux } from '../../redux/slices/network.reducer';

export default function Header() {
	const [isPlay, setisPlay] = React.useState(false);
	const rounds = useSelector((state) => state.network.value).round;
	const dispatch = useDispatch();
	const hundleClick = () => {
		dispatch(
			relectionClusterHeadsAndLinksRedux({
				formula: 0,
			})
		);
	};
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
							{`Round ${rounds}`}
						</Typography>
						<Button
							variant='contained'
							onClick={hundleClick}
							color='secondary'
							endIcon={<PlayArrowIcon />}
						>
							Move To Next Round
						</Button>
					</Stack>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
