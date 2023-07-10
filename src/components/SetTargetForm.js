import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { green, blue } from '@mui/material/colors';
import Store from '../store/Store';

function SetTargetsForm({ onSubmitEnd }) {
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
		if (onSubmitEnd) {
			onSubmitEnd();
		}
	};

	return (
		<Box style={{ padding: '1rem' }}>
			<form onSubmit={handleFormSubmit}>
				<label htmlFor="TargetsInput">Set targets:</label>
				<Box sx={{ flexGrow: 1 }}>
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
						type="targetCalories"
						value={localTargetCalories}
						onChange={(e) => {
							setLocalTargetCalories(e.target.value);
						}}
						required
						fullWidth
					/>

					<h3>Gifts:</h3>
					{localMilestoneGifts.map((milestoneGift, i) => (
						<Box className="base-goal-row" key={milestoneGift.milestone}>
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
				</Box>
				<button type="submit">Set Goals</button>
			</form>
		</Box>
	);
}

export default SetTargetsForm;
