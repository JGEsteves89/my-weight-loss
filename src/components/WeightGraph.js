import dayjs from 'dayjs';

import React from 'react';
import { Box } from '@mui/material';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, ReferenceLine, Tooltip } from 'recharts';
import { useTheme } from '@mui/material/styles';

import Store from '../store/Store';

function WeightGraph() {
	const theme = useTheme();
	const { weights, getMaxWeight, getMilestones } = Store.useWeightStore();
	const maxWeight = getMaxWeight();
	const { milestone1, milestone2, milestone3 } = getMilestones();
	const sortedWeight = weights.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));
	return (
		<Box sx={{ height: '32.5vh' }}>
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={sortedWeight} margin={{ top: 15, right: 30, left: 50, bottom: 20 }}>
					<XAxis
						dataKey="date"
						tickLine={false}
						axisLine={false}
						padding="no-gap"
						tickFormatter={(value) => dayjs(value).format('MM/DD')}
						tick={{ fontFamily: 'Arial', fontSize: '0.8rem', fill: theme.palette.info.dark, dy: 10 }}
					/>
					<YAxis hide={true} type="number" domain={['dataMin - 1', 'dataMax + 1']} />
					<Tooltip />
					<ReferenceLine
						label={{
							value: maxWeight + 'kg',
							position: 'left',
							fontFamily: 'Arial',
							fontSize: '0.8rem',
							fill: theme.palette.info.dark,
						}}
						ifOverflow="extendDomain"
						y={maxWeight}
						stroke={theme.palette.secondary.dark}
					/>
					<ReferenceLine
						label={{
							value: milestone1 + 'kg',
							position: 'left',
							fontFamily: 'Arial',
							fontSize: '0.8rem',
							fill: theme.palette.info.dark,
						}}
						ifOverflow="extendDomain"
						y={milestone1}
						stroke={theme.palette.secondary.dark}
					/>
					<ReferenceLine
						label={{
							value: milestone2 + 'kg',
							position: 'left',
							fontFamily: 'Arial',
							fontSize: '0.8rem',
							fill: theme.palette.info.dark,
						}}
						ifOverflow="extendDomain"
						y={milestone2}
						stroke={theme.palette.secondary.dark}
					/>
					<ReferenceLine
						label={{
							value: milestone3 + 'kg',
							position: 'left',
							fontFamily: 'Arial',
							fontSize: '0.8rem',
							fill: theme.palette.info.dark,
						}}
						ifOverflow="extendDomain"
						y={milestone3}
						stroke={theme.palette.secondary.dark}
					/>
					<Line type="monotone" dataKey="weight" stroke={theme.palette.primary.main} />
				</LineChart>
			</ResponsiveContainer>
		</Box>
	);
}

export default WeightGraph;
