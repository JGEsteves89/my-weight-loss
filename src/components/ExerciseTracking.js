import React, { useState } from 'react';

function ExerciseTracking() {
	const [exerciseMinutes, setExerciseMinutes] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		// Logic to handle form submission and exercise tracking
		console.log('Exercise minutes:', exerciseMinutes);
		// You can add your own logic here to handle the exercise tracking data
		// For example, you can make an API request to save the exercise minutes data to a database
	};

	const handleChange = (e) => {
		setExerciseMinutes(e.target.value);
	};

	return (
		<div className="component">
			<h2>Exercise Tracking</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="exerciseMinutesInput">Exercise Minutes:</label>
				<input
					type="number"
					id="exerciseMinutesInput"
					value={exerciseMinutes}
					onChange={handleChange}
					placeholder="Enter exercise minutes"
					required
				/>
				<button type="submit">Track Exercise</button>
			</form>
		</div>
	);
}

export default ExerciseTracking;
