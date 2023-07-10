import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { AppBar, Box } from '@mui/material';

import HomeView from './views/HomeView';

import './App.css';

function App() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Header />
			</AppBar>
			<Router>
				<div className="container">
					<Routes>
						<Route exact path={`/:username/`} element={<HomeView />}></Route>
					</Routes>
				</div>
			</Router>
		</Box>
	);
}

export default App;
