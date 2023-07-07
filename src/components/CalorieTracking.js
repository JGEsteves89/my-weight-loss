import dayjs from 'dayjs';

import { IconButton, Box } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import Store from '../store/Store';

import CaloriesGraph from './CaloriesGraph';
import ModalWindow from './ModalWindow';

function CalorieTracking() {
	const [open, setOpen] = useState(false);
	const { addCaloriesEntry, targetCalories, getTodaysCalories } = Store.useCaloriesStore();

	const [calories, setCalories] = useState(targetCalories);
	const [caloriesDate, setCaloriesDate] = useState(dayjs());

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addCaloriesEntry(calories, caloriesDate.format('YYYY/MM/DD'));
		handleClose();
	};

	return (
		<Box className="component" sx={{ flexGrow: 1 }}>
			<div className="base-card">
				<div className="base-card-row base-card-header">
					<div className="justify" />
					<div className="justify">
						<h2 className="base-card-title">Calories</h2>
					</div>
					<div className="justify">
						<IconButton variant="contained" color="primary" className="top-button" aria-label="Add Calories" onClick={handleOpen}>
							<AddIcon />
						</IconButton>
					</div>
				</div>
				<div className="base-card-row">
					<div className="justify base-card-value-unit calories-card-value-unit">
						<h2 className="base-card-value">{getTodaysCalories()}</h2>
						<h3 className="base-card-unit">cals</h3>
					</div>
				</div>
				<div className="base-card-row base-card-graph">
					<CaloriesGraph />
				</div>
			</div>
			<ModalWindow open={open} onClose={handleClose}>
				<Box style={{ width: '100%' }}>
					<form onSubmit={handleSubmit}>
						<label htmlFor="CaloriesInput">Enter your calories:</label>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateCalendar value={caloriesDate} disableFuture onChange={(newValue) => setCaloriesDate(newValue)} />
						</LocalizationProvider>
						<input
							type="number"
							id="caloriesInput"
							value={calories}
							onChange={(e) => {
								setCalories(+e.target.value);
							}}
							placeholder="Enter calories of the day"
							required
						/>
						<button type="submit">Track Calories</button>
					</form>
				</Box>
			</ModalWindow>
		</Box>
	);
}

export default CalorieTracking;

// import React, { useState } from 'react';

// function CalorieTracking() {
// 	const [intakeCalories, setIntakeCalories] = useState('');

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		// Logic to handle form submission and calorie tracking
// 		console.log('Intake calories:', intakeCalories);
// 		// You can add your own logic here to handle the calorie tracking data
// 		// For example, you can make an API request to save the calorie intake data to a database
// 	};

// 	const handleChange = (e) => {
// 		setIntakeCalories(e.target.value);
// 	};

// 	return (
// 		<div className="component">
// 			<h2>Calorie Tracking</h2>
// 			<form onSubmit={handleSubmit}>
// 				<label htmlFor="intakeCaloriesInput">Intake Calories:</label>
// 				<input
// 					type="number"
// 					id="intakeCaloriesInput"
// 					value={intakeCalories}
// 					onChange={handleChange}
// 					placeholder="Enter intake calories"
// 					required
// 				/>
// 				<button type="submit">Track Calories</button>
// 			</form>
// 		</div>
// 	);
// }

// export default CalorieTracking;
