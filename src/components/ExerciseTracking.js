import { Typography, Box } from '@mui/material';
import React from 'react';

import Store from '../store/Store';

import ExerciseGraph from './ExerciseGraph';
import SetTargetWindow from './SetTargetWindow';
import GraphedCard from './GraphedCard';
import ExerciseAddWindow from './ExerciseAddWindow';

function ExerciseTracking() {
	const { targetExercise, getLastExercise } = Store.useExerciseStore();

	const cardActions = [
		{ text: 'Set targets', variant: 'outlined', modelWindow: <SetTargetWindow /> },
		{
			text: 'Add exercise intake',
			variant: 'contained',
			modelWindow: <ExerciseAddWindow />,
		},
	];

	const cardContent = () => {
		return (
			<>
				<Box sx={{ display: 'flex', alignItems: 'baseline' }}>
					<Typography variant="h2">{getLastExercise()}</Typography>
					<Typography variant="subtitle"> cals</Typography>
				</Box>
				<ExerciseGraph />
			</>
		);
	};
	return <GraphedCard cardTitle="Exercise" cardSubtitle={'Target: ' + targetExercise} cardContent={cardContent()} cardActions={cardActions} />;
}

export default ExerciseTracking;
