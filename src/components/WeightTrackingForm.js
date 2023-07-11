import dayjs from 'dayjs';

import { Typography, Box, TextField, Card, CardHeader, CardContent, CardActions, Button, LinearProgress } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { useState } from 'react';

import Store from '../store/Store';

import WeightGraph from './WeightGraph';
import SetTargetsForm from './SetTargetForm';
import GraphedCard from './GraphedCard';

function WeightTrackingForm() {
	const [open, setOpen] = useState(false);
	const [openSetTarget, setOpenSetTarget] = useState(false);
	const { getLastWeight, getMaxWeight, getFirstWeightDate, addWeightEntry, targetWeight, getProgress } = Store.useWeightStore();

	const [weight, setWeight] = useState(getLastWeight() | 0);
	const [weightDate, setWeightDate] = useState(dayjs());

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addWeightEntry(+weight, weightDate.format('YYYY/MM/DD'));
		handleClose();
	};

	const handleOpenSetTarget = () => {
		setOpenSetTarget(true);
	};

	const handleCloseSetTarget = () => {
		setOpenSetTarget(false);
	};

	const cardContent = () => {
		const flexBaseline = { display: 'flex', alignItems: 'baseline' };
		return (
			<>
				<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
					<Box>
						<Box sx={flexBaseline}>
							<Typography variant="h4">{getMaxWeight()}</Typography>
							<Typography variant="subtitle"> kg</Typography>
						</Box>
						<Typography variant="subtitle2">{getFirstWeightDate()}</Typography>
					</Box>
					<Box sx={flexBaseline}>
						<Typography variant="h2">{getLastWeight()}</Typography>
						<Typography variant="subtitle"> kg</Typography>
					</Box>
					<Box>
						<Box sx={flexBaseline}>
							<Typography variant="h4">{targetWeight}</Typography>
							<Typography variant="subtitle"> kg</Typography>
						</Box>
						<Typography variant="subtitle2">{getFirstWeightDate()}</Typography>
					</Box>
				</Box>
				<LinearProgress className="progress-bar" variant="determinate" value={getProgress()} />
				<WeightGraph />
			</>
		);
	};

	const cardActions = [
		{ text: 'Set target', handleClick: handleOpenSetTarget, variant: 'outlined' },
		{ text: 'Add weight measure', handleClick: handleOpen, variant: 'contained' },
	];

	const WindowAddWeight = () => {
		return {
			handleClose: handleClose,
			open: open,
			html: (
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
			cardTitle="Weight"
			cardSubtitle={null}
			cardContent={cardContent()}
			cardActions={cardActions}
			cardModalWindows={[WindowAddWeight(), WindowSetTarget()]}
		/>
	);
}

export default WeightTrackingForm;
