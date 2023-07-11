import dayjs from 'dayjs';

import { Typography, Box, TextField, Card, CardHeader, CardContent, CardActions, Button } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';

import Store from '../store/Store';

import CaloriesGraph from './CaloriesGraph';
import SetTargetsForm from './SetTargetForm';
import GraphedCard from './GraphedCard';

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

	const cardContent = () => {
		return (
			<>
				<Box sx={{ display: 'flex', alignItems: 'baseline' }}>
					<Typography variant="h2">{getLastCalories()}</Typography>
					<Typography variant="subtitle"> cals</Typography>
				</Box>
				<CaloriesGraph />
			</>
		);
	};

	const cardActions = [
		{ text: 'Set target', handleClick: handleOpenSetTarget, variant: 'outlined' },
		{ text: 'Add calories intake', handleClick: handleOpen, variant: 'contained' },
	];

	const WindowAddCalories = () => {
		return {
			handleClose: handleClose,
			open: open,
			html: (
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
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleSubmit} variant="contained" color="primary">
							Submit
						</Button>
					</CardActions>
				</Card>
			),
		};
	};

	const WindowSetTarget = () => {
		return {
			handleClose: handleCloseSetTarget,
			open: openSetTarget,
			html: <SetTargetsForm onSubmitEnd={() => handleCloseSetTarget()} />,
		};
	};

	return (
		<GraphedCard
			cardTitle="Calories"
			cardSubtitle={'Target: ' + targetCalories}
			cardContent={cardContent()}
			cardActions={cardActions}
			cardModalWindows={[WindowAddCalories(), WindowSetTarget()]}
		/>
	);
}

export default CalorieTracking;
