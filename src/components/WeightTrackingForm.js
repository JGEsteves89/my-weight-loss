import React, { useState } from 'react';

function WeightTrackingForm() {
	const [weight, setWeight] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		// Logic to handle form submission and weight tracking
		console.log('Weight submitted:', weight);
		// You can add your own logic here to handle the weight tracking data
		// For example, you can make an API request to save the weight data to a database
	};

	const handleChange = (e) => {
		setWeight(e.target.value);
	};

	return (
		<div>
			<h2>Weight Tracking</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="weightInput">Enter your weight:</label>
				<input type="number" id="weightInput" value={weight} onChange={handleChange} placeholder="Enter weight in kilograms" required />
				<button type="submit">Track Weight</button>
			</form>
		</div>
	);
}

export default WeightTrackingForm;
