// GoalSettingForm.js
import React, { useState } from 'react';

function GoalSettingForm() {
	const [targetWeight, setTargetWeight] = useState('');
	const [dailyCalories, setDailyCalories] = useState('');
	const [weeklyExercise, setWeeklyExercise] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		// Logic to handle form submission and goal setting
		console.log('Target weight:', targetWeight);
		console.log('Daily calories:', dailyCalories);
		console.log('Weekly exercise:', weeklyExercise);
		// You can add your own logic here to handle the goal setting data
		// For example, you can make an API request to save the goal data to a database
	};

	const handleTargetWeightChange = (e) => {
		setTargetWeight(e.target.value);
	};

	const handleDailyCaloriesChange = (e) => {
		setDailyCalories(e.target.value);
	};

	const handleWeeklyExerciseChange = (e) => {
		setWeeklyExercise(e.target.value);
	};

	return (
		<div className="component">
			<h2>Goal Setting</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="targetWeightInput">Target Weight:</label>
				<input
					type="number"
					id="targetWeightInput"
					value={targetWeight}
					onChange={handleTargetWeightChange}
					placeholder="Enter target weight in kilograms"
					required
				/>

				<label htmlFor="dailyCaloriesInput">Daily Calories:</label>
				<input
					type="number"
					id="dailyCaloriesInput"
					value={dailyCalories}
					onChange={handleDailyCaloriesChange}
					placeholder="Enter daily calorie intake"
					required
				/>

				<label htmlFor="weeklyExerciseInput">Weekly Exercise:</label>
				<input
					type="number"
					id="weeklyExerciseInput"
					value={weeklyExercise}
					onChange={handleWeeklyExerciseChange}
					placeholder="Enter weekly exercise in minutes"
					required
				/>

				<button type="submit">Set Goals</button>
			</form>
		</div>
	);
}

export default GoalSettingForm;
