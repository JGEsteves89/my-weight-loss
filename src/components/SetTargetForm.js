import React, { useState } from 'react';
import { Box, TextField, Card, CardHeader, CardContent, CardActions, Button } from '@mui/material';
import { green, blue } from '@mui/material/colors';
import Store from '../store/Store';

function SetTargetsForm({ onClose }) {
	const { targetWeight, setTargetWeight, getMilestones, getLastWeight } = Store.useWeightStore();
	const { targetExercise, setTargetExercise } = Store.useExerciseStore();
	const { targetCalories, setTargetCalories } = Store.useCaloriesStore();
	const { milestone1, milestone2, milestone3 } = getMilestones();
	const { getMilestonesGifts, setMilestonesGifts } = Store.useMilestonesStore();
	const milestoneGifts = getMilestonesGifts([milestone1, milestone2, milestone3], getLastWeight());

	const [localTargetWeight, setLocalTargetWeight] = useState(targetWeight);
	const [localTargetExercise, setLocalTargetExercise] = useState(targetExercise);
	const [localTargetCalories, setLocalTargetCalories] = useState(targetCalories);
	const [localMilestoneGifts, setLocalMilestoneGifts] = useState(milestoneGifts);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		if (localTargetExercise !== targetExercise) setTargetExercise(+localTargetExercise);
		if (localTargetCalories !== targetCalories) setTargetCalories(+localTargetCalories);
		if (localTargetWeight !== targetWeight) setTargetWeight(+localTargetWeight);

		let changeMilestones = false;
		for (let i = 0; i < localMilestoneGifts.length; i++) {
			if (localMilestoneGifts[i].gift !== milestoneGifts[i].gift || localMilestoneGifts[i].claimed !== milestoneGifts[i].claimed) {
				changeMilestones = true;
				break;
			}
		}
		if (changeMilestones) setMilestonesGifts(localMilestoneGifts);
		if (onClose) {
			onClose();
		}
	};

	return (
		<Card style={{ width: '100%', justifyContent: 'center' }}>
			<CardHeader title="Goal Settings" />
			<CardHeader subheader="Targets: " />
			<CardContent sx={{ display: 'flex', flexFlow: 'column', rowGap: '1rem', justifyContent: 'space-between' }}>
				<TextField
					variant="standard"
					className="base-text-field"
					id="weightTargetInput"
					label="Target weight (kg)"
					type="number"
					value={localTargetWeight}
					onChange={(e) => {
						setLocalTargetWeight(e.target.value);
					}}
					required
					fullWidth
				/>
				<TextField
					variant="standard"
					className="base-text-field"
					id="exerciseTargetInput"
					label="Target exercise per day"
					type="number"
					value={localTargetExercise}
					onChange={(e) => {
						setLocalTargetExercise(e.target.value);
					}}
					required
					fullWidth
				/>
				<TextField
					variant="standard"
					className="base-text-field"
					id="caloriesTargetInput"
					label="Target calories per day"
					type="number"
					value={localTargetCalories}
					onChange={(e) => {
						setLocalTargetCalories(e.target.value);
					}}
					required
					fullWidth
				/>
			</CardContent>
			<CardHeader subheader="Gifts: " />
			<CardContent>
				{localMilestoneGifts.map((milestoneGift, i) => (
					<Box key={milestoneGift.milestone} sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<TextField
							variant="standard"
							className="base-text-field"
							id="caloriesTargetInput"
							label={'Gift at ' + milestoneGift.targetWeight + 'kg'}
							type="string"
							value={milestoneGift.gift}
							onChange={(e) => {
								const updatedGifts = [...localMilestoneGifts];
								updatedGifts[i] = {
									...updatedGifts[i],
									gift: e.target.value,
								};
								setLocalMilestoneGifts(updatedGifts);
							}}
							sx={{ width: '70%' }}
						/>
						<Button
							variant="contained"
							color="success"
							disabled={!milestoneGift.achieved}
							sx={{
								bgcolor: milestoneGift.claimed ? blue[300] : green[500],
								color: 'white',
								width: '30%',
								margin: '1rem',
								fontSize: '0.8rem',
							}}
							onClick={() => {
								milestoneGift.claimed = true;
								setLocalMilestoneGifts(localMilestoneGifts);
							}}>
							{milestoneGift.claimed ? 'Claimed' : 'Claim'}
						</Button>
					</Box>
				))}
			</CardContent>
			<CardActions sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
				<Button onClick={() => onClose && onClose()}>Cancel</Button>
				<Button onClick={handleFormSubmit} variant="contained" color="primary">
					Submit
				</Button>
			</CardActions>
		</Card>
	);
}

export default SetTargetsForm;
