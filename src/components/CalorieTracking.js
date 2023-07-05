import React, { useState } from 'react';

function CalorieTracking() {
	const [intakeCalories, setIntakeCalories] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		// Logic to handle form submission and calorie tracking
		console.log('Intake calories:', intakeCalories);
		// You can add your own logic here to handle the calorie tracking data
		// For example, you can make an API request to save the calorie intake data to a database
	};

	const handleChange = (e) => {
		setIntakeCalories(e.target.value);
	};

	return (
		<div className="component">
			<h2>Calorie Tracking</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="intakeCaloriesInput">Intake Calories:</label>
				<input
					type="number"
					id="intakeCaloriesInput"
					value={intakeCalories}
					onChange={handleChange}
					placeholder="Enter intake calories"
					required
				/>
				<button type="submit">Track Calories</button>
			</form>
		</div>
	);
}

export default CalorieTracking;
