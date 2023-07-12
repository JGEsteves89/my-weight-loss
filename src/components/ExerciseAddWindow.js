import dayjs from 'dayjs';

import { TextField, Card, CardHeader, CardContent, CardActions, Button } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';

import Store from '../store/Store';

import ModalWindow from './ModalWindow';

function ExerciseAddWindow({ open, onClose, day = dayjs().format('YYYY/MM/DD') }) {
	const { addExerciseEntry, targetExercise } = Store.useExerciseStore();
	const [exercise, setExercise] = useState(targetExercise);
	const [exerciseDate, setExerciseDate] = useState(dayjs(day));

	const handleSubmit = (e) => {
		e.preventDefault();
		addExerciseEntry(+exercise, exerciseDate.format('YYYY/MM/DD'));
		onClose();
	};
	if (day !== exerciseDate.format('YYYY/MM/DD')) {
		setExerciseDate(dayjs(day));
	}
	return (
		<ModalWindow open={open} onClose={onClose}>
			<Card style={{ width: '100%', justifyContent: 'center' }}>
				<CardHeader title="Exercise" subheader="Enter your exercise: " />
				<CardContent>
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

export default ExerciseAddWindow;
