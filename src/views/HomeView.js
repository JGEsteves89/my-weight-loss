import React, { useEffect } from 'react';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';

import Store from '../store/Store';

import CalorieTracking from '../components/CalorieTracking';
import ExerciseTracking from '../components/ExerciseTracking';
import GoalSettingForm from '../components/GoalSettingForm';
import WeightTrackingForm from '../components/WeightTrackingForm';
import DayCalendarView from '../components/DayCalendarView';
import GoalsTracking from '../components/GoalsTracking';
import WeightVelocity from '../components/WeightVelocity';

function HomeView({ username }) {
	const cards = [
		<DayCalendarView />,
		<WeightTrackingForm />,
		<CalorieTracking />,
		<ExerciseTracking />,
		<GoalsTracking />,
		<WeightVelocity />,
		<GoalSettingForm />,
	];

	const { ready, user, setUser } = Store.useUserDataStore();

	useEffect(() => {
		if (username !== user) {
			setUser(username);
		}
	}, [user, username, setUser]);

	if (username === '') {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<Typography variant="h5" color="secondary">
					{'Please visit ' + window.location.origin + '/my-weight-loss?user=[yourname]'}
				</Typography>
			</div>
		);
	}

	if (!ready) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<CircularProgress />
			</div>
		);
	}

	return (
		<>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Typography variant="h5" color="secondary">
					{username}
				</Typography>
			</Box>
			<Grid container spacing={2}>
				{cards.map((card, i) => (
					<Grid item xs={12} sm={6} key={i} sx={{ marginTop: '1rem' }}>
						<Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>{card}</Box>
					</Grid>
				))}
			</Grid>
		</>
	);
}

export default HomeView;
