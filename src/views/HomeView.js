import React, { useEffect } from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

import Store from '../store/Store';

import CalorieTracking from '../components/CalorieTracking';
import ExerciseTracking from '../components/ExerciseTracking';
import GoalSettingForm from '../components/GoalSettingForm';
import WeightTrackingForm from '../components/WeightTrackingForm';
import DayCalendarView from '../components/DayCalendarView';
import GoalsTracking from '../components/GoalsTracking';
import WeightVelocity from '../components/WeightVelocity';

function HomeView() {
	const cards = [
		<WeightVelocity />,
		<DayCalendarView />,
		<WeightTrackingForm />,
		<CalorieTracking />,
		<ExerciseTracking />,
		<GoalsTracking />,
		<GoalSettingForm />,
	];

	const { ready, user, setUser } = Store.useUserDataStore();
	const { username } = useParams();

	useEffect(() => {
		console.log('User', username);
		if (username !== user) {
			setUser(username);
		}
	}, [user, username, setUser]);

	if (!ready) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<CircularProgress />
			</div>
		);
	}

	return (
		<Grid container spacing={2}>
			{cards.map((card, i) => (
				<Grid item xs={12} sm={6} key={i} sx={{ marginTop: '1rem' }}>
					<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>{card}</Box>
				</Grid>
			))}
		</Grid>
	);
}

export default HomeView;
