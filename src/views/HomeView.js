import React, { useEffect } from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

import Store from '../store/Store';

import CalorieTracking from '../components/CalorieTracking';
import ExerciseTracking from '../components/ExerciseTracking';
import GoalSettingForm from '../components/GoalSettingForm';
import WeightTrackingForm from '../components/WeightTrackingForm';

function HomeView() {
	const cards = [
		{ id: 1, html: <WeightTrackingForm /> },
		{ id: 2, html: <CalorieTracking /> },
		{ id: 3, html: <ExerciseTracking /> },
		{ id: 4, html: <GoalSettingForm /> },
	];

	const { ready, user, setUser } = Store.useUserDataStore();
	const { username } = useParams();

	useEffect(() => {
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
		<div className="view">
			<Grid container spacing={2}>
				{cards.map((card) => (
					<Grid item xs={12} sm={6} key={card.id}>
						<div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>{card.html}</div>
					</Grid>
				))}
			</Grid>
		</div>
	);
}

export default HomeView;
