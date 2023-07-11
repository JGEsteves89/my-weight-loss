import dayjs from 'dayjs';

import React from 'react';
import { Box } from '@mui/material';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

import { useTheme } from '@mui/material/styles';
import Store from '../store/Store';

function ExerciseGraph() {
	const theme = useTheme();
	const { allExercise, targetExercise } = Store.useExerciseStore();
	const data = [];
	for (const day of allExercise.sort((a, b) => dayjs(a.date).diff(dayjs(b.date))).slice(-7)) {
		const exercise = day.exercise;
		data.push({ date: day.date, red: exercise < targetExercise ? exercise : null, green: exercise >= targetExercise ? exercise : null });
	}
	return (
		<Box sx={{ height: '30vh' }}>
			<ResponsiveContainer width="100%" height="100%">
				<BarChart data={data} margin={{ top: 15, right: 10, left: -18, bottom: 5 }}>
					<XAxis
						dataKey="date"
						tickLine={false}
						axisLine={false}
						padding="no-gap"
						tickFormatter={(value) => dayjs(value).format('MM/DD')}
						tick={{ fontFamily: 'Arial', fontSize: '0.8rem', fill: theme.palette.info.dark, dy: 10 }}
					/>
					<YAxis
						tick={{ fontFamily: 'Arial', fontSize: '0.8rem', fill: theme.palette.info.dark }}
						type="number"
						domain={[0, 'dataMax + 100']}
					/>
					<Tooltip />
					<Bar dataKey="green" stackId="a" fill={theme.palette.success.light} />
					<Bar dataKey="red" stackId="a" fill={theme.palette.error.light} />
				</BarChart>
			</ResponsiveContainer>
		</Box>
	);
}

export default ExerciseGraph;
