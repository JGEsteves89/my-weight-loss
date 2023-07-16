import dayjs from 'dayjs';

import { Box, Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import React, { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import Store from '../store/Store';
import { lerpHexColor } from '../utils/Color';

import GraphedCard from './GraphedCard';
import CaloriesAddWindow from './CaloriesAddWindow';
import ExerciseAddWindow from './ExerciseAddWindow';
import WeightAddWindow from './WeightAddWindow';

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
		newAllDaysData.maxCalories = allCalories.length === 0 ? 0 : Math.max(...allCalories.map((c) => c.calories).filter((c) => c !== 0));
		newAllDaysData.minCalories = allCalories.length === 0 ? 0 : Math.min(...allCalories.map((c) => c.calories).filter((c) => c !== 0));
		newAllDaysData.avgCalories =
			allCalories.length === 0 ? 0 : allCalories.map((c) => c.calories).reduce((p, c) => (p += c)) / allCalories.length;
		newAllDaysData.maxExercise = allExercise.length === 0 ? 0 : Math.max(...allExercise.map((c) => c.exercise).filter((c) => c !== 0));
		newAllDaysData.minExercise = allExercise.length === 0 ? 0 : Math.min(...allExercise.map((c) => c.exercise).filter((c) => c !== 0));
		newAllDaysData.avgExercise =
			allExercise.length === 0 ? 0 : allExercise.map((c) => c.exercise).reduce((p, c) => (p += c)) / allExercise.length;
		newAllDaysData.maxWeightLoss = weightLossList.length === 0 ? 0 : Math.max(...weightLossList);
		newAllDaysData.minWeightLoss = weightLossList.length === 0 ? 0 : Math.min(...weightLossList);
		newAllDaysData.avgWeight = weightLossList.length === 0 ? 0 : weightLossList.reduce((p, c) => (p += c)) / weightLossList.length;

		const ratio = (value, max, min) => {
			if (!value) return null;
			return (value - min) / (max - min);
		};

		const allIndexes = [];
		for (const day in newAllDaysData) {
			const { calories, exercise, weight } = newAllDaysData[day];
			if (calories || exercise || weight) {
				const calHow = ratio(newAllDaysData[day].calories, newAllDaysData.minCalories, newAllDaysData.maxCalories);
				newAllDaysData[day].calHow = calHow;

				const exeHow = ratio(newAllDaysData[day].exercise, newAllDaysData.maxExercise, newAllDaysData.minExercise);
				newAllDaysData[day].exeHow = exeHow;

				const weiHow = ratio(newAllDaysData[day].weight, newAllDaysData.minWeightLoss, newAllDaysData.maxWeightLoss);
				newAllDaysData[day].weiHow = weiHow;

				const average = (values) => {
					let sum = 0;
					let count = 0;
					for (const value of values) {
						if (value !== null) {
							sum += value;
							count++;
						}
					}
					if (count === 0) {
						return 0;
					}
					return sum / count;
				};

				// const avg = average([calHow, calAvg, exeHow, exeAvg, weiHow, weiAvg]);
				const avg = average([calHow, exeHow, weiHow]);
				newAllDaysData[day].healthIndex = avg;

				allIndexes.push(avg);
			}
		}

		newAllDaysData.maxIndex = allIndexes.length === 0 ? 0 : Math.max(...allIndexes);
		newAllDaysData.minIndex = allIndexes.length === 0 ? 0 : Math.min(...allIndexes);
		setAllDaysData(newAllDaysData);
	}, [allCalories, allExercise, weights]);

	const DaySlot = (props) => {
		const day = props.day.format('YYYY/MM/DD');

		let withColor = {};
		if (allDaysData[day]) {
			const colorIndex = (allDaysData[day].healthIndex - allDaysData.minIndex) / (allDaysData.maxIndex - allDaysData.minIndex);
			const bgColor = lerpHexColor(theme.palette.error.main, theme.palette.success.main, colorIndex);

			withColor.backgroundColor = bgColor;

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
				color:
					allDaysData[day] && allDaysData[day].calHow !== null
						? allDaysData[day].calHow > 0.5
							? theme.palette.success.main
							: theme.palette.error.main
						: theme.palette.primary.main,
				unit: 'cals',
				addWindow: <CaloriesAddWindow />,
			},
			{
				title: 'exercise',
				value: allDaysData[day] && allDaysData[day].exercise ? allDaysData[day].exercise : 'N/A',
				color:
					allDaysData[day] && allDaysData[day].exeHow !== null
						? allDaysData[day].exeHow > 0.5
							? theme.palette.success.main
							: theme.palette.error.main
						: theme.palette.primary.main,
				unit: 'cals',
				addWindow: <ExerciseAddWindow />,
			},
			{
				title: 'weight',
				value: allDaysData[day] && allDaysData[day].weight ? allDaysData[day].weight.toFixed(1) : 'N/A',
				color:
					allDaysData[day] && allDaysData[day].weiHow !== null
						? allDaysData[day].weiHow > 0.5
							? theme.palette.success.main
							: theme.palette.error.main
						: theme.palette.primary.main,
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
										color: c.color,
										cursor: 'pointer',
										'&:hover': { textDecoration: 'underline' },
									}}
									onClick={handleOpen}>
									<Typography variant="h5">{c.value}</Typography>
									<Typography variant="caption">{c.unit}</Typography>
								</Box>
								<Typography variant="subtitle">{c.title}</Typography>
								{!c.addWindow ? <></> : React.cloneElement(c.addWindow, { open: isDialogVisible, onClose: handleClose, day: day })}
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
