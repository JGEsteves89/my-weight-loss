import dayjs from 'dayjs';

import { IconButton, Box, TextField } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import Store from '../store/Store';

import ExerciseGraph from './ExerciseGraph';
import ModalWindow from './ModalWindow';
import SetTargetsForm from './SetTargetForm';

function ExerciseTracking() {
	const [open, setOpen] = useState(false);
	const [openSetTarget, setOpenSetTarget] = useState(false);
	const { addExerciseEntry, targetExercise, getLastExercise } = Store.useExerciseStore();

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
		addExerciseEntry(+exercise, exerciseDate.format('YYYY/MM/DD'));
		handleClose();
	};

	const handleOpenSetTarget = () => {
		setOpenSetTarget(true);
	};

	const handleCloseSetTarget = () => {
		setOpenSetTarget(false);
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
						<h2 className="base-card-value">{getLastExercise()}</h2>
						<h3 className="base-card-unit">of</h3>
						<h3 className="base-card-value-s clicable" onClick={handleOpenSetTarget}>
							{targetExercise}
						</h3>
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
						<TextField
							variant="standard"
							className="base-text-field"
							id="exerciseInput"
							label="Enter exercise of the day"
							type="number"
							value={exercise}
							onChange={(e) => {
								setExercise(e.target.value);
							}}
							required
						/>
						<button type="submit">Track Exercise</button>
					</form>
				</Box>
			</ModalWindow>
			<ModalWindow open={openSetTarget} onClose={handleCloseSetTarget}>
				<SetTargetsForm onSubmitEnd={() => handleCloseSetTarget()} />
			</ModalWindow>
		</Box>
	);
}

export default ExerciseTracking;
