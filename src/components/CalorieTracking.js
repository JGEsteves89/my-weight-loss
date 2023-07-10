import dayjs from 'dayjs';

import { IconButton, Box, TextField } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import Store from '../store/Store';

import CaloriesGraph from './CaloriesGraph';
import ModalWindow from './ModalWindow';
import SetTargetsForm from './SetTargetForm';

function CalorieTracking() {
	const [open, setOpen] = useState(false);
	const [openSetTarget, setOpenSetTarget] = useState(false);
	const { addCaloriesEntry, targetCalories, getLastCalories } = Store.useCaloriesStore();

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
		addCaloriesEntry(+calories, caloriesDate.format('YYYY/MM/DD'));
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
						<h2 className="base-card-value">{getLastCalories()}</h2>
						<h3 className="base-card-unit">of</h3>
						<h3 className="base-card-value-s clicable" onClick={handleOpenSetTarget}>
							{targetCalories}
						</h3>
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
						<TextField
							variant="standard"
							className="base-text-field"
							id="caloriesInput"
							label="Enter calories of the day"
							type="number"
							value={calories}
							onChange={(e) => {
								setCalories(e.target.value);
							}}
							required
						/>
						<button type="submit">Track Calories</button>
					</form>
				</Box>
			</ModalWindow>
			<ModalWindow open={openSetTarget} onClose={handleCloseSetTarget}>
				<SetTargetsForm onSubmitEnd={() => handleCloseSetTarget()} />
			</ModalWindow>
		</Box>
	);
}

export default CalorieTracking;
