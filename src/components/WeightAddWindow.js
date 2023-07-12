import dayjs from 'dayjs';

import { TextField, Card, CardHeader, CardContent, CardActions, Button } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';

import Store from '../store/Store';

import ModalWindow from './ModalWindow';

function WeightAddWindow({ open, onClose, day = dayjs().format('YYYY/MM/DD') }) {
	const { getLastWeight, addWeightEntry } = Store.useWeightStore();

	const [weight, setWeight] = useState(getLastWeight() | 0);
	const [weightDate, setWeightDate] = useState(dayjs(day));

	const handleSubmit = (e) => {
		e.preventDefault();
		addWeightEntry(+weight, weightDate.format('YYYY/MM/DD'));
		onClose();
	};

	return (
		<ModalWindow open={open} onClose={onClose}>
			<Card style={{ width: '100%', justifyContent: 'center' }}>
				<CardHeader title="Weight" subheader="Enter your weight: " />
				<CardContent>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateCalendar value={weightDate} disableFuture onChange={(newValue) => setWeightDate(newValue)} />
					</LocalizationProvider>
					<TextField
						variant="standard"
						className="base-text-field"
						id="weightInput"
						label="Enter weight of the day"
						type="number"
						value={weight}
						onChange={(e) => {
							setWeight(e.target.value);
						}}
						required
						fullWidth
					/>
				</CardContent>
				<CardActions sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
					<Button onClick={onClose}>Cancel</Button>
					<Button onClick={handleSubmit} variant="contained" color="primary">
						Submit
					</Button>
				</CardActions>
			</Card>
		</ModalWindow>
	);
}

export default WeightAddWindow;
