import React from 'react';
import { Grid } from '@mui/material';

import CalorieTracking from '../components/CalorieTracking';
import DataAnalysisVisualization from '../components/DataAnalysisVisualization';
import ExerciseTracking from '../components/ExerciseTracking';
import GoalSettingForm from '../components/GoalSettingForm';
import WeightTrackingForm from '../components/WeightTrackingForm';

function HomeView() {
	const cards = [
		{ id: 1, html: <WeightTrackingForm /> },
		{ id: 2, html: <CalorieTracking /> },
		{ id: 3, html: <ExerciseTracking /> },
		{ id: 4, html: <GoalSettingForm /> },
		{ id: 5, html: <DataAnalysisVisualization /> },
	];
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
