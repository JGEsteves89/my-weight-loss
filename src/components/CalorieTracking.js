import { Typography, Box } from '@mui/material';
import React from 'react';

import Store from '../store/Store';

import CaloriesGraph from './CaloriesGraph';
import SetTargetWindow from './SetTargetWindow';
import GraphedCard from './GraphedCard';
import CaloriesAddWindow from './CaloriesAddWindow';

function CalorieTracking() {
	const { targetCalories, getLastCalories } = Store.useCaloriesStore();

	const cardContent = () => {
		return (
			<>
				<Box sx={{ display: 'flex', alignItems: 'baseline' }}>
					<Typography variant="h2">{getLastCalories()}</Typography>
					<Typography variant="subtitle"> cals</Typography>
				</Box>
				<CaloriesGraph />
			</>
		);
	};
	const cardActions = [
		{ text: 'Set target', variant: 'outlined', modelWindow: <SetTargetWindow /> },
		{
			text: 'Add calories intake',
			variant: 'contained',
			modelWindow: <CaloriesAddWindow />,
		},
	];

	return <GraphedCard cardTitle="Calories" cardSubtitle={'Target: ' + targetCalories} cardContent={cardContent()} cardActions={cardActions} />;
}

export default CalorieTracking;
