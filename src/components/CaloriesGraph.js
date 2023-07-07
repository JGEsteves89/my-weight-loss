import dayjs from 'dayjs';

import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

import Store from '../store/Store';

function CaloriesGraph() {
	const { allCalories, targetCalories } = Store.useCaloriesStore();
	const data = [];
	for (const day of allCalories.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))) {
		const cals = day.calories;
		data.push({ date: day.date, green: cals <= targetCalories ? cals : null, red: cals > targetCalories ? cals : null });
	}
	return (
		<ResponsiveContainer width="100%" height="100%">
			<BarChart data={data} margin={{ top: 15, right: 10, left: -18, bottom: 5 }}>
				<XAxis
					dataKey="date"
					tickLine={false}
					axisLine={false}
					padding="no-gap"
					tickFormatter={(value) => dayjs(value).format('MM/DD')}
					tick={{ fontFamily: 'Arial', fontSize: '0.8rem', fill: 'rgba(25,118,210,0.5)', dy: 10 }}
				/>
				<YAxis tick={{ fontFamily: 'Arial', fontSize: '0.8rem', fill: 'rgba(25,118,210,0.5)' }} type="number" domain={[0, 'dataMax + 100']} />
				<Tooltip />
				<Bar dataKey="green" stackId="a" fill="#88ffee" />
				<Bar dataKey="red" stackId="a" fill="#ff4478" />
			</BarChart>
		</ResponsiveContainer>
	);
}

export default CaloriesGraph;
