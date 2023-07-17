import { Toolbar, IconButton, Typography, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';

import Store from '../store/Store';

function Header() {
	const { user, ready } = Store.useUserDataStore();
	return (
		<Toolbar sx={{ justifyContent: 'space-between' }}>
			<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
				<MenuIcon />
			</IconButton>
			<Box sx={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between' }}>
				<Typography variant="h6">MY</Typography>
				{ready && (
					<Typography variant="h5" color="secondary">
						{'(' + user.slice(0, 1).toUpperCase() + user.slice(-(user.length - 1)).toLowerCase() + ')'}
					</Typography>
				)}
				<Typography variant="h6">WEIGHT LOSS APP</Typography>
			</Box>
			<div className="version-tag">v0.1.2.h</div>
		</Toolbar>
	);
}

export default Header;
