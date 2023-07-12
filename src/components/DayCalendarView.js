import dayjs from 'dayjs';

import { Box, Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import React, { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import Store from '../store/Store';

import GraphedCard from './GraphedCard';
import CaloriesAddWindow from './CaloriesAddWindow';
import ExerciseAddWindow from './ExerciseAddWindow';
import WeightAddWindow from './WeightAddWindow';

const hex = (p) => (Math.max(0, Math.min((p * 255) / 100, 255)) | 0).toString(16).padStart(2, '0');
const withAlpha = (c, p) => c + hex(p);

function DialogHandles() {
	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const handleOpen = () => {
		setIsDialogVisible(true);
	};

	const handleClose = () => {
		setIsDialogVisible(false);
	};
	return {
		isDialogVisible,
		handleOpen,
		handleClose,
	};
}

function DayCalendarView() {
	const theme = useTheme();
	const [selectedDate, setSelectedDate] = useState(dayjs());
	const [allDaysData, setAllDaysData] = useState({});
	const { allCalories } = Store.useCaloriesStore();
	const { allExercise } = Store.useExerciseStore();
	const { weights } = Store.useWeightStore();

	useEffect(() => {
		const newAllDaysData = {};

		const verify = (data, day) => {
			if (!data[day]) {
				data[day] = { calories: null, exercise: null, weight: null };
			}
		};

		for (const calories of allCalories) {
			verify(newAllDaysData, calories.date);
			newAllDaysData[calories.date].calories = calories.calories;
		}
		for (const exercise of allExercise) {
			verify(newAllDaysData, exercise.date);
			newAllDaysData[exercise.date].exercise = exercise.exercise;
		}
		let lastWeight;
		const weightLossList = [];
		for (const weight of weights.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))) {
			verify(newAllDaysData, weight.date);
			if (!lastWeight) {
				newAllDaysData[weight.date].weight = 0;
				weightLossList.push(0);
			} else {
				newAllDaysData[weight.date].weight = weight.weight - lastWeight;
				weightLossList.push(weight.weight - lastWeight);
			}
			lastWeight = weight.weight;
		}
		newAllDaysData.maxCalories = Math.max(...allCalories.map((c) => c.calories));
		newAllDaysData.minCalories = Math.min(...allCalories.map((c) => c.calories));
		newAllDaysData.avgCalories = allCalories.map((c) => c.calories).reduce((p, c) => (p += c)) / allCalories.length;
		newAllDaysData.maxExercise = Math.max(...allExercise.map((c) => c.exercise));
		newAllDaysData.minExercise = Math.min(...allExercise.map((c) => c.exercise));
		newAllDaysData.avgExercise = allExercise.map((c) => c.exercise).reduce((p, c) => (p += c)) / allExercise.length;
		newAllDaysData.maxWeightLoss = Math.max(...weightLossList);
		newAllDaysData.minWeightLoss = Math.min(...weightLossList);
		newAllDaysData.avgWeight = weightLossList.reduce((p, c) => (p += c)) / weightLossList.length;

		setAllDaysData(newAllDaysData);
	}, [allCalories, allExercise, weights]);

	const DaySlot = (props) => {
		const day = props.day.format('YYYY/MM/DD');

		const ratio = (value, max, min) => {
			if (!value) return 0;
			return (value - min) / (max - min);
		};

		let withColor = {};
		if (allDaysData[day]) {
			const calHow = ratio(allDaysData[day].calories, allDaysData.minCalories, allDaysData.maxCalories);
			const calAvg = allDaysData[day].calories < allDaysData.avgCalories ? 1 : 0;

			const exeHow = ratio(allDaysData[day].exercise, allDaysData.maxExercise, allDaysData.minExercise);
			const exeAvg = allDaysData[day].exercise > allDaysData.avgExercise ? 1 : 0;

			const weiHow = ratio(allDaysData[day].weight, allDaysData.maxWeightLoss, allDaysData.minWeightLoss);
			const weiAvg = allDaysData[day].weight < allDaysData.avgWeight ? 1 : 0;

			const average = (calHow + calAvg + exeHow + exeAvg + weiHow + weiAvg) / 6;
			if (average > 0.5) {
				const ratio = (1 - average) / 0.5;
				withColor.backgroundColor = withAlpha(theme.palette.success.main, 30 + ((100 - ratio * 100) | 0) / 2);
			} else {
				const ratio = average / 0.5;
				withColor.backgroundColor = withAlpha(theme.palette.error.main, 30 + ((100 - ratio * 100) | 0) / 2);
			}
			if (props.selected) {
				withColor['&.Mui-selected'] = {
					backgroundColor: withColor.backgroundColor,
					border: '1px solid ' + theme.palette.primary.main,
					color: theme.palette.text.primary,
				};
			}
		}
		return <PickersDay sx={withColor} {...props} key={props.day.toString()} />;
	};

	const cardContent = () => {
		const day = selectedDate.format('YYYY/MM/DD');

		const dayValues = [
			{
				title: 'calories',
				value: allDaysData[day] && allDaysData[day].calories ? allDaysData[day].calories : 'N/A',
				unit: 'cals',
				addWindow: <CaloriesAddWindow />,
			},
			{
				title: 'exercise',
				value: allDaysData[day] && allDaysData[day].exercise ? allDaysData[day].exercise : 'N/A',
				unit: 'cals',
				addWindow: <ExerciseAddWindow />,
			},
			{
				title: 'weight',
				value: allDaysData[day] && allDaysData[day].weight ? allDaysData[day].weight.toFixed(1) : 'N/A',
				unit: 'kg',
				addWindow: <WeightAddWindow />,
			},
		];

		return (
			<Box>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DateCalendar
						value={selectedDate}
						disableFuture
						onChange={(newValue) => setSelectedDate(newValue)}
						slots={{
							day: DaySlot,
						}}
					/>
				</LocalizationProvider>
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
					{dayValues.map((c) => {
						const { isDialogVisible, handleOpen, handleClose } = DialogHandles();
						return (
							<Box
								sx={{ display: 'flex', flexFlow: 'column', alignItems: 'center', justifyContent: 'center', width: '30%' }}
								key={c.title}>
								<Box
									sx={{
										display: 'flex',
										alignItems: 'baseline',
										color: theme.palette.primary.main,
										cursor: 'pointer',
										'&:hover': { textDecoration: 'underline' },
									}}
									onClick={handleOpen}>
									<Typography variant="h5">{c.value}</Typography>
									<Typography variant="caption">{c.unit}</Typography>
								</Box>
								<Typography variant="subtitle">{c.title}</Typography>
								{!!c.addWindow && React.cloneElement(c.addWindow, { open: isDialogVisible, onClose: handleClose, day: day })}
							</Box>
						);
					})}
				</Box>
			</Box>
		);
	};

	return <GraphedCard cardTitle="Calendar view" cardContent={cardContent()} />;
}

export default DayCalendarView;
