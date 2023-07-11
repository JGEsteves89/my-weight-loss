import dayjs from 'dayjs';

import { Typography, Box, TextField, Card, CardHeader, CardContent, CardActions, Button } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';

import Store from '../store/Store';

import ExerciseGraph from './ExerciseGraph';
import SetTargetsForm from './SetTargetForm';
import GraphedCard from './GraphedCard';

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

	const cardActions = [
		{ text: 'Set target', handleClick: handleOpenSetTarget, variant: 'outlined' },
		{ text: 'Add exercise intake', handleClick: handleOpen, variant: 'contained' },
	];

	const cardContent = () => {
		return (
			<>
				<Box sx={{ display: 'flex', alignItems: 'baseline' }}>
					<Typography variant="h2">{getLastExercise()}</Typography>
					<Typography variant="subtitle"> cals</Typography>
				</Box>
				<ExerciseGraph />
			</>
		);
	};

	const WindowAddExercise = () => {
		return {
			handleClose: handleClose,
			open: open,
			html: (
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
			cardTitle="Exercise"
			cardSubtitle={'Target: ' + targetExercise}
			cardContent={cardContent()}
			cardActions={cardActions}
			cardModalWindows={[WindowAddExercise(), WindowSetTarget()]}
		/>
	);
}

export default ExerciseTracking;
