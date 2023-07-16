import dayjs from 'dayjs';

import { TextField, Card, CardHeader, CardContent, CardActions, Button } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState, useEffect } from 'react';

import Store from '../store/Store';

import ModalWindow from './ModalWindow';

function CaloriesAddWindow({ open, onClose, day = dayjs().format('YYYY/MM/DD') }) {
	const { allCalories, addCaloriesEntry, targetCalories } = Store.useCaloriesStore();

	const [calories, setCalories] = useState(allCalories[day] ? allCalories[day].calories : targetCalories);
	const [caloriesDate, setCaloriesDate] = useState(dayjs(day));

	useEffect(() => {
		const caloriesOfDay = allCalories.find((c) => c.date === day);
		setCaloriesDate(dayjs(day));
		setCalories(caloriesOfDay ? caloriesOfDay.calories : targetCalories);
	}, [day, setCaloriesDate, setCalories, allCalories, targetCalories]);

	const handleSubmit = (e) => {
		e.preventDefault();
		addCaloriesEntry(+calories, caloriesDate.format('YYYY/MM/DD'));
		onClose();
	};

	return (
		<ModalWindow open={open} onClose={onClose}>
			<Card style={{ width: '100%', justifyContent: 'center' }}>
				<CardHeader title="Calories" subheader="Enter your calories: " />
				<CardContent>
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

export default CaloriesAddWindow;
