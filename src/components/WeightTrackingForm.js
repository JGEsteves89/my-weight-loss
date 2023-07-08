import dayjs from 'dayjs';

import { IconButton, Box, LinearProgress, TextField } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import Store from '../store/Store';

import WeightGraph from './WeightGraph';
import ModalWindow from './ModalWindow';

function WeightTrackingForm() {
	const [open, setOpen] = useState(false);
	const { getLastWeight, getMaxWeight, getFirstWeightDate, addWeightEntry, targetWeight, getProgress } = Store.useWeightStore();

	const [weight, setWeight] = useState(getLastWeight());
	const [weightDate, setWeightDate] = useState(dayjs());

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addWeightEntry(weight, weightDate.format('YYYY/MM/DD'));
		handleClose();
	};

	return (
		<Box className="component" sx={{ flexGrow: 1 }}>
			<div className="base-card">
				<div className="base-card-row base-card-header">
					<div className="justify" />
					<div className="justify">
						<h2 className="base-card-title">Weight</h2>
					</div>
					<div className="justify">
						<IconButton variant="contained" color="primary" className="top-button" aria-label="Add Weight" onClick={handleOpen}>
							<AddIcon />
						</IconButton>
					</div>
				</div>
				<div className="base-card-row">
					<div className="justify base-card-at-date">
						<div className="justify base-card-value-unit">
							<h2 className="base-card-value-s">{getMaxWeight()}</h2>
							<h3 className="base-card-unit-s">kg</h3>
						</div>
						<div className="base-card-date">{getFirstWeightDate()}</div>
					</div>
					<div className="justify base-card-value-unit">
						<h2 className="base-card-value">{getLastWeight()}</h2>
						<h3 className="base-card-unit">kg</h3>
					</div>
					<div className="justify base-card-at-date">
						<div className="justify base-card-value-unit">
							<h2 className="base-card-value-s">{targetWeight}</h2>
							<h3 className="base-card-unit-s">kg</h3>
						</div>
						<div className="base-card-date">{getFirstWeightDate()}</div>
					</div>
				</div>
				<div className="base-card-row">
					<LinearProgress className="progress-bar" variant="determinate" value={getProgress()} />
				</div>
				<div className="base-card-row base-card-graph">
					<WeightGraph />
				</div>
			</div>
			<ModalWindow open={open} onClose={handleClose}>
				<Box style={{ width: '100%' }}>
					<form onSubmit={handleSubmit}>
						<label htmlFor="weightInput">Enter your weight:</label>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DateCalendar value={weightDate} disableFuture onChange={(newValue) => setWeightDate(newValue)} />
						</LocalizationProvider>
						<TextField
							variant="standard"
							className="base-text-field"
							id="weightInput"
							label="Enter weight in kilograms"
							type="number"
							value={weight}
							onChange={(e) => {
								setWeight(+e.target.value);
							}}
							required
						/>
						<button type="submit">Track Weight</button>
					</form>
				</Box>
			</ModalWindow>
		</Box>
	);
}

export default WeightTrackingForm;
