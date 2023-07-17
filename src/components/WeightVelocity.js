import dayjs from 'dayjs';

import { Typography, Box, CardContent } from '@mui/material';
import React from 'react';

import Store from '../store/Store';

import SetTargetWindow from './SetTargetWindow';
import GraphedCard from './GraphedCard';

const getStats = (values) => {
	const totalDiff = values.reduce((p, c) => (p += c.diff), 0);
	const totalDays = values.reduce((p, c) => (p += c.dateDiff), 0);
	const avgPerDay = totalDiff / totalDays;
	const avgPerWeek = avgPerDay * 7;
	return { avgPerDay, avgPerWeek, totalDiff };
};

function WeightVelocity() {
	const { weights, getLastWeight, getMaxWeight, getFirstWeightDate, targetWeight, getMilestones, getEstimatedDay } = Store.useWeightStore();
	const { milestone1, milestone2 } = getMilestones();

	let sortedWeight = weights.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
	const firstDate = sortedWeight.length > 0 ? sortedWeight[0].date : dayjs().format('YYYY/MM/DD');
	let lastWeight = sortedWeight.length > 0 ? sortedWeight[0].weight : 0;
	let lastDate = 0;
	sortedWeight = sortedWeight.map((w) => {
		const date = dayjs(w.date).diff(dayjs(firstDate), 'day');
		const diff = w.weight - lastWeight;
		const dateDiff = date - lastDate;
		lastWeight = w.weight;
		lastDate = date;
		return { weight: w.weight, date, diff, dateDiff, dateFull: w.date };
	});

	const total = getStats(sortedWeight);
	const lastWeek = getStats(sortedWeight.filter((c) => c.dateFull > dayjs().add(-7, 'days').format('YYYY/MM/DD')));
	const daysUntilTarget = Math.ceil((targetWeight - getLastWeight()) / total.avgPerDay);
	const daysUntilMilestone1 = Math.ceil((milestone1 - getLastWeight()) / total.avgPerDay);
	const daysUntilMilestone2 = Math.ceil((milestone2 - getLastWeight()) / total.avgPerDay);
	const bmr = (88.362 + 13.397 * lastWeight + 4.799 * 182 - 5.677 * 34) * 1.2;
	const { allCalories } = Store.useCaloriesStore();
	const weekCalories =
		allCalories
			.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))
			.slice(-7)
			.reduce((p, c) => (p += c.calories), 0) / 7;

	const { allExercise } = Store.useExerciseStore();
	const weekExercise =
		allExercise
			.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))
			.slice(-7)
			.reduce((p, c) => (p += c.exercise), 0) / 7;

	const kgToCal = 7700;
	const deficit = weekCalories - weekExercise - bmr;
	const expectedWeightLoss = (deficit / kgToCal) * 7;
	const exeIntPercentage = [0.5, 0.5];
	const defictFor1KgPerDay = exeIntPercentage.map((p) => (p * (1 * kgToCal)) / 7);
	const defictFor2KgPerDay = exeIntPercentage.map((p) => (p * (2 * kgToCal)) / 7);

	const cardContent = () => {
		const flexBaseline = { display: 'flex', alignItems: 'baseline' };
		const stats = [
			{
				section: 'Progress',
				values: [
					{ title: 'Loss so far:', value: total.totalDiff.toFixed(1), unit: 'kg' },
					{ title: 'Still to go:', value: (getLastWeight() - targetWeight).toFixed(1), unit: 'kg' },
				],
			},
			{
				section: 'Averages',
				values: [
					{ title: 'Loss average per day:', value: total.avgPerDay.toFixed(2), unit: 'kg/day' },
					{ title: 'Loss average per week:', value: total.avgPerWeek.toFixed(2), unit: 'kg/week' },
					{ title: 'Weight loss last week:', value: lastWeek.totalDiff.toFixed(2), unit: 'kg/week' },
					{ title: 'Average loss last week:', value: lastWeek.avgPerDay.toFixed(2), unit: 'kg/day' },
				],
			},
			{
				section: 'Estimations',
				values: [
					{ title: '1st Milestone ' + milestone1.toFixed(0) + 'kg:', value: daysUntilMilestone1, unit: 'days' },
					{ title: '2nd Milestone ' + milestone2.toFixed(0) + 'kg:', value: daysUntilMilestone2, unit: 'days' },
					{ title: 'Time estimated to goal:', value: daysUntilTarget, unit: 'days' },
				],
			},
			{
				section: 'Calories Intake',
				values: [
					{ title: 'BMR:', value: bmr.toFixed(0), unit: 'cals' },
					{ title: 'Daily avg intake:', value: weekCalories.toFixed(0), unit: 'cals' },
					{ title: 'Daily avg exercise:', value: weekExercise.toFixed(0), unit: 'cals' },
					{ title: 'Daily avg deficit:', value: deficit.toFixed(0), unit: 'cals' },
					{ title: 'Expected weight loss:', value: expectedWeightLoss.toFixed(2), unit: 'kg/week' },
					{ title: 'Expected weight loss:', value: (expectedWeightLoss / 7).toFixed(2), unit: 'kg/day' },
				],
			},
			{
				section: 'Calories defict',
				values: [
					{ title: 'To lose 1kg (daily intake):', value: (bmr - defictFor1KgPerDay[0]).toFixed(0), unit: 'cals/day' },
					{ title: 'To lose 1kg exercise:', value: defictFor1KgPerDay[0].toFixed(0), unit: 'cals/day' },
					{ title: 'To lose 2kg (daily intake):', value: (bmr - defictFor2KgPerDay[0]).toFixed(0), unit: 'cals/day' },
					{ title: 'To lose 2kg exercise:', value: defictFor2KgPerDay[0].toFixed(0), unit: 'cals/day' },
				],
			},
		];

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
						<Typography variant="subtitle2">{getEstimatedDay()}</Typography>
					</Box>
				</Box>
				{stats.map((stat, i) => {
					return (
						<CardContent key={i}>
							<Typography variant="h5" color="primary">
								{stat.section}
							</Typography>
							{stat.values.map((value, i) => {
								return (
									<Box key={i} sx={{ display: 'grid', gridTemplateColumns: 'auto 20% 10%', alignItems: 'center' }}>
										<Typography sx={{ justifySelf: 'start' }} variant="subtitle1">
											{value.title}
										</Typography>
										<Typography sx={{ justifySelf: 'center' }} variant="h6">
											{value.value}
										</Typography>
										<Typography sx={{ justifySelf: 'start' }} variant="caption">
											{value.unit}
										</Typography>
									</Box>
								);
							})}
						</CardContent>
					);
				})}
			</>
		);
	};
	const cardActions = [{ text: 'Set targets', variant: 'outlined', modelWindow: <SetTargetWindow /> }];

	return <GraphedCard cardTitle="Weight Velocity Stats" cardSubtitle={null} cardContent={cardContent()} cardActions={cardActions} />;
}

export default WeightVelocity;
