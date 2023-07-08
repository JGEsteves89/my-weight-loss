import React from 'react';
import { Box, TextField } from '@mui/material';
import Store from '../store/Store';

function SetTargetsForm({ onSubmitEnd }) {
	const { targetExercise, setTargetExercise } = Store.useExerciseStore();
	const { targetCalories, setTargetCalories } = Store.useCaloriesStore();

	return (
		<Box style={{ width: '100%' }}>
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
				/>
				<TextField
					variant="standard"
					className="base-text-field"
					id="caloriesTargetInput"
					label="Target calories per day"
					type="number"
					value={targetCalories}
					onChange={(e) => {
						setTargetCalories(+e.target.value);
					}}
					required
				/>
				<button type="submit">Set Goals</button>
			</form>
		</Box>
	);
}

export default SetTargetsForm;
