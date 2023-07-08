import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import { green, blue } from '@mui/material/colors';
import Store from '../store/Store';

function SetTargetsForm({ onSubmitEnd }) {
	const { targetExercise, setTargetExercise } = Store.useExerciseStore();
	const { targetCalories, setTargetCalories } = Store.useCaloriesStore();
	const { targetWeight, setTargetWeight, getMilestones, getLastWeight } = Store.useWeightStore();
	const { milestone1, milestone2, milestone3 } = getMilestones();
	const { getMilestonesGifts, setMilestonesGifts } = Store.useMilestonesStore();
	const milestoneGifts = getMilestonesGifts([milestone1, milestone2, milestone3], getLastWeight());
	return (
		<Box style={{ padding: '1rem' }}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					setTargetExercise(targetExercise);
					setTargetCalories(targetCalories);
					if (onSubmitEnd) {
						onSubmitEnd();
					}
				}}>
				<label htmlFor="TargetsInput">Set targets:</label>
				<Box sx={{ flexGrow: 1 }}>
					<TextField
						variant="standard"
						className="base-text-field"
						id="weightTargetInput"
						label="Target weight (kg)"
						type="number"
						value={targetWeight}
						onChange={(e) => {
							setTargetWeight(+e.target.value);
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
						value={targetExercise}
						onChange={(e) => {
							setTargetExercise(+e.target.value);
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
						value={targetCalories}
						onChange={(e) => {
							setTargetCalories(+e.target.value);
						}}
						required
						fullWidth
					/>

					<h3>Gifts:</h3>
					{milestoneGifts.map((milestoneGift) => (
						<Box className="base-goal-row" key={milestoneGift.milestone}>
							<TextField
								variant="standard"
								className="base-text-field"
								id="caloriesTargetInput"
								label={'Gift at ' + milestoneGift.targetWeight + 'kg'}
								type="string"
								value={milestoneGift.gift}
								onChange={(e) => {
									milestoneGift.gift = e.target.value;
									setMilestonesGifts(milestoneGifts);
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
									setMilestonesGifts(milestoneGifts);
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
