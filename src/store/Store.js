import dayjs from 'dayjs';
import { create } from 'zustand';

const useWeightStore = create((set, get) => ({
	weights: [
		{ weight: 100, date: dayjs('2023/07/01').format('YYYY/MM/DD') },
		{ weight: 99, date: dayjs('2023/07/02').format('YYYY/MM/DD') },
		{ weight: 98.5, date: dayjs('2023/07/04').format('YYYY/MM/DD') },
		{ weight: 98, date: dayjs('2023/07/05').format('YYYY/MM/DD') },
		{ weight: 96.7, date: dayjs('2023/07/06').format('YYYY/MM/DD') },
		{ weight: 96.3, date: dayjs('2023/07/07').format('YYYY/MM/DD') },
	],
	addWeightEntry: (weight, date) => {
		console.log('Added new weight entry:', { weight, date });
		set((state) => ({
			weights: [...state.weights, { weight, date }],
		}));
	},
	targetWeight: 80,
	setTargetWeight: (weight) => {
		set((state) => ({
			targetWeight: weight,
		}));
	},
	getLastWeight: () => (get().weights.length > 0 ? get().weights[get().weights.length - 1].weight : null),
	getMaxWeight: () => Math.max(...get().weights.map((entry) => entry.weight), null),
	getFirstWeightDate: () => (get().weights.length > 0 ? get().weights.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))[0].date : null),
	getMilestones: () => {
		const maxWeight = get().getMaxWeight();
		const toTarget = maxWeight - get().targetWeight;
		const step = (((toTarget / 3) * 10) | 0) / 10;
		return { milestone1: maxWeight - step * 1, milestone2: maxWeight - step * 2, milestone3: maxWeight - step * 3 };
	},
	getProgress: () =>
		get().getMaxWeight() ? (((get().getMaxWeight() - get().getLastWeight()) / (get().getMaxWeight() - get().targetWeight)) * 100) | 0 : null,
	getCurrentDate: () => dayjs().format('YYYY/MM/DD'),
}));

const Store = { useWeightStore };
export default Store;
