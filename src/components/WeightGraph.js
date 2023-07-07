import dayjs from 'dayjs';

import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, ReferenceLine, Tooltip } from 'recharts';

import Store from '../store/Store';

function WeightGraph() {
	const { weights, getMaxWeight, getMilestones } = Store.useWeightStore();
	const maxWeight = getMaxWeight();
	const { milestone1, milestone2, milestone3 } = getMilestones();
	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart data={weights.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))} margin={{ top: 15, right: 30, left: 50, bottom: 5 }}>
				<XAxis
					dataKey="date"
					tickLine={false}
					axisLine={false}
					padding="no-gap"
					tickFormatter={(value) => dayjs(value).format('MM/DD')}
					tick={{ fontFamily: 'Arial', fontSize: '0.8rem', fill: 'rgba(25,118,210,0.5)', dy: 10 }}
				/>
				<YAxis hide={true} type="number" domain={['dataMin - 1', 'dataMax + 1']} />
				<Tooltip />
				<ReferenceLine
					label={{
						value: maxWeight + 'kg',
						position: 'left',
						fontFamily: 'Arial',
						fontSize: '0.8rem',
						fill: 'rgba(25,118,210,0.5)',
					}}
					ifOverflow="extendDomain"
					y={maxWeight}
					stroke="rgba(25,118,210,0.05)"
				/>
				<ReferenceLine
					label={{
						value: milestone1 + 'kg',
						position: 'left',
						fontFamily: 'Arial',
						fontSize: '0.8rem',
						fill: 'rgba(25,118,210,0.5)',
					}}
					ifOverflow="extendDomain"
					y={milestone1}
					stroke="rgba(25,118,210,0.1)"
				/>
				<ReferenceLine
					label={{
						value: milestone2 + 'kg',
						position: 'left',
						fontFamily: 'Arial',
						fontSize: '0.8rem',
						fill: 'rgba(25,118,210,0.5)',
					}}
					ifOverflow="extendDomain"
					y={milestone2}
					stroke="rgba(25,118,210,0.15)"
				/>
				<ReferenceLine
					label={{
						value: milestone3 + 'kg',
						position: 'left',
						fontFamily: 'Arial',
						fontSize: '0.8rem',
						fill: 'rgba(25,118,210,0.5)',
					}}
					ifOverflow="extendDomain"
					y={milestone3}
					stroke="rgba(25,118,210,0.2)"
				/>
				<Line type="monotone" dataKey="weight" stroke="#8884d8" />
			</LineChart>
		</ResponsiveContainer>
	);
}

export default WeightGraph;
