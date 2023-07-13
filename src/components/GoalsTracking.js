import { Typography, Box, Button, LinearProgress } from '@mui/material';

import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@mui/material/styles';

import Store from '../store/Store';

import SetTargetWindow from './SetTargetWindow';
import GraphedCard from './GraphedCard';

function GoalsTracking() {
	const theme = useTheme();
	const { getMilestones, getLastWeight, getMaxWeight } = Store.useWeightStore();
	const { getMilestonesGifts, setMilestonesGifts } = Store.useMilestonesStore();
	const [localMilestoneGifts, setLocalMilestoneGifts] = useState(null);
	const lastWeight = getLastWeight();
	const calculateMilestoneGifts = useCallback(() => {
		const { milestone1, milestone2, milestone3 } = getMilestones();
		return getMilestonesGifts([milestone1, milestone2, milestone3], lastWeight);
	}, [getMilestones, getMilestonesGifts, lastWeight]);

	useEffect(() => {
		setLocalMilestoneGifts(calculateMilestoneGifts());
	}, [calculateMilestoneGifts]);

	const handleFormSubmit = (e) => {
		let changeMilestones = false;
		const milestoneGifts = calculateMilestoneGifts();
		for (let i = 0; i < localMilestoneGifts.length; i++) {
			if (localMilestoneGifts[i].gift !== milestoneGifts[i].gift || localMilestoneGifts[i].claimed !== milestoneGifts[i].claimed) {
				changeMilestones = true;
				break;
			}
		}
		if (changeMilestones) setMilestonesGifts(localMilestoneGifts);
	};
	const cardContent = () => {
		if (!localMilestoneGifts) return <></>;
		return (
			<>
				{localMilestoneGifts.map((milestoneGift, i) => {
					const progress = Math.min((((getMaxWeight() - getLastWeight()) / (getMaxWeight() - milestoneGift.targetWeight)) * 100) | 0, 100);

					return (
						<Box key={milestoneGift.milestone} sx={{ display: 'flex', flexFlow: 'column', margin: '0.5rem' }}>
							<Button
								variant="contained"
								color="success"
								disabled={!milestoneGift.achieved}
								sx={{
									display: 'block',
									bgcolor: milestoneGift.claimed ? theme.palette.success.dark : theme.palette.info.dark,
									'&:hover': { bgcolor: milestoneGift.claimed ? theme.palette.success.main : theme.palette.info.main },
									width: '100%',
								}}
								onClick={() => {
									const updatedGifts = [...localMilestoneGifts];
									updatedGifts[i] = {
										...updatedGifts[i],
										claimed: !updatedGifts[i].claimed,
									};
									setLocalMilestoneGifts(updatedGifts);
									handleFormSubmit();
								}}>
								<Box sx={{ display: 'flex', justifyContent: 'center', flexFlow: 'column', alignItems: 'center' }}>
									<Typography color={theme.palette.secondary.light} variant="body">
										{milestoneGift.gift}
									</Typography>
									<Typography variant="caption">{'Gift at ' + milestoneGift.targetWeight + 'kg'}</Typography>
								</Box>
								<LinearProgress
									variant="determinate"
									value={progress}
									color={milestoneGift.achieved ? 'success' : !milestoneGift.claimed ? 'secondary' : 'info'}
								/>
							</Button>
						</Box>
					);
				})}
			</>
		);
	};
	const cardActions = [{ text: 'Set targets', variant: 'outlined', modelWindow: <SetTargetWindow /> }];
	return <GraphedCard cardTitle="Milestones" cardContent={cardContent()} cardActions={cardActions} />;
}

export default GoalsTracking;
