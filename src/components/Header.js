import { Toolbar, IconButton, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';

function Header() {
	return (
		<Toolbar>
			<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
				<MenuIcon />
			</IconButton>
			<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
				My Weight Loss App
			</Typography>
			<Button color="inherit">Login</Button>
		</Toolbar>
	);
}

export default Header;
