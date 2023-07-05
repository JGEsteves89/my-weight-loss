import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

import HomeView from './views/HomeView';
import CaloriesTrakingView from './views/CaloriesTrakingView';
import ExerciseTrackingView from './views/ExerciseTrackingView';
import MilestonesAndRewardsView from './views/MilestonesAndRewardsView';

import './App.css'; // Import the CSS file
function App() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Header />
			</AppBar>
			<Router>
				<div className="container">
					<Routes>
						<Route exact path="/" element={<HomeView />}></Route>
						<Route path="/calorie-tracking" element={<CaloriesTrakingView />}></Route>
						<Route path="/exercise-tracking" element={<ExerciseTrackingView />}></Route>
						<Route path="/milestones-and-rewards" element={<MilestonesAndRewardsView />}></Route>
					</Routes>
				</div>
			</Router>
		</Box>
	);
}

export default App;
