import dayjs from 'dayjs';
import { create } from 'zustand';

const useWeightStore = create((set, get) => ({
	weights: [
		{ weight: 98, date: dayjs('2023/07/05').format('YYYY/MM/DD') },
		{ weight: 96.7, date: dayjs('2023/07/06').format('YYYY/MM/DD') },
		{ weight: 96.3, date: dayjs('2023/07/07').format('YYYY/MM/DD') },
		{ weight: 95.3, date: dayjs('2023/07/08').format('YYYY/MM/DD') },
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
const useCaloriesStore = create((set, get) => ({
	allCalories: [
		{ calories: 2000, date: dayjs('2023/07/05').format('YYYY/MM/DD') },
		{ calories: 2000, date: dayjs('2023/07/06').format('YYYY/MM/DD') },
		{ calories: 2000, date: dayjs('2023/07/07').format('YYYY/MM/DD') },
	],
	addCaloriesEntry: (calories, date) => {
		console.log('Added new calories entry:', { calories, date });
		set((state) => ({
			allCalories: [...state.allCalories, { calories, date }],
		}));
	},
	targetCalories: 2000,
	setTargetCalories: (calories) => {
		set((state) => ({
			targetCalories: calories,
		}));
	},
	getTodaysCalories: () => {
		const find = get().allCalories.find((c) => c.date === dayjs().format('YYYY/MM/DD'));
		return find ? find.calories : 0;
	},
}));

const useExerciseStore = create((set, get) => ({
	allExercise: [
		{ exercise: 228, date: dayjs('2023/07/05').format('YYYY/MM/DD') },
		{ exercise: 229, date: dayjs('2023/07/06').format('YYYY/MM/DD') },
		{ exercise: 200, date: dayjs('2023/07/07').format('YYYY/MM/DD') },
	],
	addExerciseEntry: (exercise, date) => {
		console.log('Added new exercise entry:', { exercise, date });
		set((state) => ({
			allExercise: [...state.allExercise, { exercise, date }],
		}));
	},
	targetExercise: 300,
	setTargetExercise: (exercise) => {
		set((state) => ({
			targetExercise: exercise,
		}));
	},
	getTodaysExercise: () => {
		const find = get().allExercise.find((c) => c.date === dayjs().format('YYYY/MM/DD'));
		return find ? find.exercise : 0;
	},
}));

const useMilestonesStore = create((set, get) => ({
	milestonesGifts: [
		{ milestone: 1, gift: '50£ in T-shirts', claimed: false, targetWeight: 0, achieved: false },
		{ milestone: 2, gift: 'Extravagância para a Alba', claimed: false, targetWeight: 0, achieved: false },
		{ milestone: 3, gift: 'PC', claimed: false, targetWeight: 0, achieved: false },
	],
	setMilestonesGifts: (gifts) => {
		console.log('Milestones gifts modified:', gifts);
		set((state) => ({
			milestonesGifts: gifts,
		}));
	},
	getMilestonesGifts: (weightMilestones, currentWeight) => {
		const milestonesGifts = get().milestonesGifts;
		for (let i = 0; i < milestonesGifts.length; i++) {
			milestonesGifts[i].targetWeight = weightMilestones[i];
			milestonesGifts[i].achieved = currentWeight < weightMilestones[i];
		}
		return milestonesGifts;
	},
}));
const Store = { useWeightStore, useCaloriesStore, useExerciseStore, useMilestonesStore };
export default Store;
