import { IconButton, Box } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import './WeightTrackingForm.css';

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
	const data = [
		{ x: 0, y: 8 },
		{ x: 1, y: 5 },
		{ x: 2, y: 4 },
		{ x: 3, y: 9 },
		{ x: 4, y: 1 },
		{ x: 5, y: 7 },
		{ x: 6, y: 6 },
		{ x: 7, y: 3 },
		{ x: 8, y: 2 },
		{ x: 9, y: 0 },
	];
	return (
		<Box className="component" sx={{ flexGrow: 1 }}>
			<div className="weight-card">
				<div className="weight-card-row weight-card-header">
					<div className="justify">-</div>
					<div className="justify ">
						<h2 className="weight-card-title">Weight</h2>
					</div>
					<div className="justify">
						<IconButton variant="contained" color="primary" className="top-button" aria-label="Add Weight">
							<AddIcon />
						</IconButton>
					</div>
				</div>
				<div className="weight-card-row">
					<div className="justify weight-card-value-unit">
						<h2 className="weight-card-value">98</h2>
						<h3 className="weight-card-unit">kg</h3>
					</div>
				</div>
				<div className="weight-card-row">
					<XYPlot height={300} width={300}>
						<VerticalGridLines />
						<HorizontalGridLines />
						<XAxis />
						<YAxis />
						<LineSeries data={data} />
					</XYPlot>
				</div>
			</div>

			{/* <form onSubmit={handleSubmit}>
				<label htmlFor="weightInput">Enter your weight:</label>
				<input type="number" id="weightInput" value={weight} onChange={handleChange} placeholder="Enter weight in kilograms" required />
				<button type="submit">Track Weight</button>
			</form> */}
		</Box>
	);
}

export default WeightTrackingForm;
