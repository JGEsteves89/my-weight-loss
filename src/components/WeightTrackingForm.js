import { Typography, Box, LinearProgress } from '@mui/material';
import React from 'react';

import Store from '../store/Store';

import WeightGraph from './WeightGraph';
import SetTargetWindow from './SetTargetWindow';
import GraphedCard from './GraphedCard';
import WeightAddWindow from './WeightAddWindow';

function WeightTrackingForm() {
	const { getLastWeight, getMaxWeight, getFirstWeightDate, targetWeight, getProgress } = Store.useWeightStore();

	const cardContent = () => {
		const flexBaseline = { display: 'flex', alignItems: 'baseline' };
		return (
			<>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Box>
						<Box sx={flexBaseline}>
							<Typography variant="h4">{getMaxWeight()}</Typography>
							<Typography variant="subtitle"> kg</Typography>
						</Box>
						<Typography variant="subtitle2">{getFirstWeightDate()}</Typography>
					</Box>
					<Box sx={flexBaseline}>
						<Typography variant="h2">{getLastWeight()}</Typography>
						<Typography variant="subtitle"> kg</Typography>
					</Box>
					<Box>
						<Box sx={flexBaseline}>
							<Typography variant="h4">{targetWeight}</Typography>
							<Typography variant="subtitle"> kg</Typography>
						</Box>
						<Typography variant="subtitle2">{getFirstWeightDate()}</Typography>
					</Box>
				</Box>
				<LinearProgress variant="determinate" value={getProgress()} />
				<WeightGraph />
			</>
		);
	};
	const cardActions = [
		{ text: 'Set targets', variant: 'outlined', modelWindow: <SetTargetWindow /> },
		{
			text: 'Add weight measure',
			variant: 'contained',
			modelWindow: <WeightAddWindow />,
		},
	];

	return <GraphedCard cardTitle="Weight" cardSubtitle={null} cardContent={cardContent()} cardActions={cardActions} />;
}

export default WeightTrackingForm;
