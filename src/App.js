import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Box, Container } from '@mui/material';

import Header from './components/Header';
import HomeView from './views/HomeView';

import 'normalize.css';
import './App.css';

function App() {
	return (
		<Box sx={{ backgroundColor: (theme) => theme.palette.background.paper }}>
			<AppBar position="static">
				<Header />
			</AppBar>
			<Container>
				<Router>
					<Routes>
						<Route exact path={`/:username/`} element={<HomeView />}></Route>
					</Routes>
				</Router>
			</Container>
		</Box>
	);
}

export default App;
