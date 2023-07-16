import React, { useState, useEffect } from 'react';
import { AppBar, Box, Container } from '@mui/material';

import Header from './components/Header';
import HomeView from './views/HomeView';

import 'normalize.css';
import './App.css';

function App() {
	const [user, setUser] = useState('');

	useEffect(() => {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const params = Object.fromEntries(urlSearchParams.entries());
		if (params.user && params.user !== '') {
			setUser(params.user);
		}
	}, []);

	return (
		<Box sx={{ backgroundColor: (theme) => theme.palette.background.paper }}>
			<AppBar position="static">
				<Header />
			</AppBar>
			<Container>
				<HomeView username={user} />
			</Container>
		</Box>
	);
}

export default App;
