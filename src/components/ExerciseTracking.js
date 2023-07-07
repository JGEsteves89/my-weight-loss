import dayjs from 'dayjs';

import { IconButton, Box } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import Store from '../store/Store';

import ExerciseGraph from './ExerciseGraph';
import ModalWindow from './ModalWindow';

function ExerciseTracking() {
	const [open, setOpen] = useState(false);
	const { addExerciseEntry, targetExercise, getTodaysExercise } = Store.useExerciseStore();

	const [exercise, setExercise] = useState(targetExercise);
	const [exerciseDate, setExerciseDate] = useState(dayjs());

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addExerciseEntry(exercise, exerciseDate.format('YYYY/MM/DD'));
		handleClose();
	};

	return (
		<Box className="component" sx={{ flexGrow: 1 }}>
			<div className="base-card">
				<div className="base-card-row base-card-header">
					<div className="justify" />
					<div className="justify">
						<h2 className="base-card-title">Exercise</h2>
					</div>
					<div className="justify">
						<IconButton variant="contained" color="primary" className="top-button" aria-label="Add Exercise" onClick={handleOpen}>
							<AddIcon />
						</IconButton>
					</div>
				</div>
				<div className="base-card-row">
					<div className="justify base-card-value-unit calories-card-value-unit">
						<h2 className="base-card-value">{getTodaysExercise()}</h2>
						<h3 className="base-card-unit">cals</h3>
					</div>
				</div>
				<div className="base-card-row base-card-graph">
					<ExerciseGraph />
				</div>
			</div>
			<ModalWindow open={open} onClose={handleClose}>
				<Box style={{ width: '100%' }}>
					<form onSubmit={handleSubmit}>
						<label htmlFor="ExerciseInput">Enter your exercise:</label>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateCalendar value={exerciseDate} disableFuture onChange={(newValue) => setExerciseDate(newValue)} />
						</LocalizationProvider>
						<input
							type="number"
							id="exerciseInput"
							value={exercise}
							onChange={(e) => {
								setExercise(+e.target.value);
							}}
							placeholder="Enter exercise of the day"
							required
						/>
						<button type="submit">Track Exercise</button>
					</form>
				</Box>
			</ModalWindow>
		</Box>
	);
}

export default ExerciseTracking;

// import React, { useState } from 'react';

// function ExerciseTracking() {
// 	const [exerciseMinutes, setExerciseMinutes] = useState('');

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		// Logic to handle form submission and exercise tracking
// 		console.log('Exercise minutes:', exerciseMinutes);
// 		// You can add your own logic here to handle the exercise tracking data
// 		// For example, you can make an API request to save the exercise minutes data to a database
// 	};

// 	const handleChange = (e) => {
// 		setExerciseMinutes(e.target.value);
// 	};

// 	return (
// 		<div className="component">
// 			<h2>Exercise Tracking</h2>
// 			<form onSubmit={handleSubmit}>
// 				<label htmlFor="exerciseMinutesInput">Exercise Minutes:</label>
// 				<input
// 					type="number"
// 					id="exerciseMinutesInput"
// 					value={exerciseMinutes}
// 					onChange={handleChange}
// 					placeholder="Enter exercise minutes"
// 					required
// 				/>
// 				<button type="submit">Track Exercise</button>
// 			</form>
// 		</div>
// 	);
// }

// export default ExerciseTracking;
