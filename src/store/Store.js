import dayjs from 'dayjs';
import { create } from 'zustand';

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, onValue, set as setDatabase } from 'firebase/database';
//import getConfig from './combobulation.dec.js';
import getConfig from './combobulation.js';

const DEBUG = false;
const sa = process.env.REACT_APP_SECRET;
const app = initializeApp(getConfig(sa));
const auth = getAuth(app);
let bearer = authenticateWithPassword();

function push() {
	const user = Store.useUserDataStore.getState().user;
	if (DEBUG) console.log('Trying to push for', user);
	if (Store.useUserDataStore.getState().user === '') return;
	if (DEBUG) console.log('Pushing for', user);
	const { weights, targetWeight } = Store.useWeightStore.getState();
	const { allCalories, targetCalories } = Store.useCaloriesStore.getState();
	const { allExercise, targetExercise } = Store.useExerciseStore.getState();
	const { milestonesGifts } = Store.useMilestonesStore.getState();
	if (DEBUG)
		console.log('Pushing for', user, 'on', user + '/data', 'with', {
			weights,
			targetWeight,
			allCalories,
			targetCalories,
			allExercise,
			targetExercise,
			milestonesGifts,
		});
	setDatabase(
		ref(getDatabase(), user + '/data'),
		{ weights, targetWeight, allCalories, targetCalories, allExercise, targetExercise, milestonesGifts },
		{
			bearer,
		}
	);
}

function pull(data) {
	if (DEBUG) console.log('Pulling');
	let { weights, targetWeight, allCalories, targetCalories, allExercise, targetExercise, milestonesGifts } = data ?? {};

	if (!weights) weights = [];
	if (!allCalories) allCalories = [];
	if (!allExercise) allExercise = [];
	if (!milestonesGifts)
		milestonesGifts = [
			{ milestone: 1, gift: '', claimed: false, targetWeight: 0, achieved: false },
			{ milestone: 2, gift: '', claimed: false, targetWeight: 0, achieved: false },
			{ milestone: 3, gift: '', claimed: false, targetWeight: 0, achieved: false },
		];
	if (!targetWeight) targetWeight = 0;
	if (!targetCalories) targetCalories = 0;
	if (!targetExercise) targetExercise = 0;

	Store.useWeightStore.getState().setState({ weights, targetWeight });
	Store.useCaloriesStore.getState().setState({ allCalories, targetCalories });
	Store.useExerciseStore.getState().setState({ allExercise, targetExercise });
	Store.useMilestonesStore.getState().setState({ milestonesGifts });
	Store.useUserDataStore.getState().setReady(true);
	if (DEBUG) console.log('App is ready!');
}

async function authenticateWithPassword() {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, getConfig(sa).email, getConfig(sa).password);
		const token = await userCredential.user.getIdToken();
		return {
			Authorization: `Bearer ${token}`, // Replace `token` with your actual token value
		};
	} catch (error) {
		console.error('Authentication error:', error);
		throw error;
	}
}

const useWeightStore = create((set, get) => ({
	weights: [],
	setState: ({ weights, targetWeight }) => {
		if (DEBUG) console.log('Weights set state');
		set((state) => ({
			weights,
			targetWeight,
		}));
	},
	addWeightEntry: (weight, date) => {
		if (DEBUG) console.log('Added new weight entry:', { weight, date });
		const { weights } = get();
		const weightIndex = weights.findIndex((w) => w.date === date);

		if (weightIndex !== -1) {
			set((state) => {
				state.weights[weightIndex].weight = weight;
				return { weights: state.weights };
			});
		} else {
			set((state) => {
				state.weights.push({ weight: weight, date: date });
				return { weights: state.weights };
			});
		}
		push();
	},
	targetWeight: 80,
	setTargetWeight: (weight) => {
		if (DEBUG) console.log('Target weight set', weight);
		set({ targetWeight: weight });
		push();
	},
	getLastWeight: () => {
		const weights = get().weights;
		return weights.length > 0 ? weights.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)))[0].weight : 0;
	},
	getMaxWeight: () => {
		const weights = get().weights;
		return weights.length > 0 ? Math.max(...weights.map((entry) => entry.weight)) : null;
	},
	getFirstWeightDate: () => {
		const weights = get().weights;
		return weights.length > 0 ? weights.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)))[0].date : null;
	},
	getMilestones: () => {
		const maxWeight = get().getMaxWeight();
		const toTarget = maxWeight - get().targetWeight;
		const step = (((toTarget / 3) * 10) | 0) / 10;
		return {
			milestone1: maxWeight - step * 1,
			milestone2: maxWeight - step * 2,
			milestone3: maxWeight - step * 3,
		};
	},
	getProgress: () => {
		const maxWeight = get().getMaxWeight();
		const lastWeight = get().getLastWeight();
		const targetWeight = get().targetWeight;
		return maxWeight ? (((maxWeight - lastWeight) / (maxWeight - targetWeight)) * 100) | 0 : null;
	},
	getEstimatedDay: () => {
		const maxWeight = get().getMaxWeight();
		const lastWeight = get().getLastWeight();

		const firstDay = get().getFirstWeightDate();
		const totalDays = dayjs().diff(dayjs(firstDay), 'day');
		const avgWeightLossDay = (maxWeight - lastWeight) / totalDays;

		const targetWeight = get().targetWeight;
		const stillToGo = lastWeight - targetWeight;
		const estimatedDays = stillToGo / avgWeightLossDay;
		return dayjs().add(estimatedDays, 'day').format('YYYY/MM/DD');
	},
}));

const useCaloriesStore = create((set, get) => ({
	allCalories: [],
	setState: ({ allCalories, targetCalories }) => {
		if (DEBUG) console.log('All calories state set');
		set((state) => ({
			allCalories,
			targetCalories,
		}));
	},
	addCaloriesEntry: (calories, date) => {
		const newEntry = { calories, date };
		if (DEBUG) console.log('Added new calories entry:', newEntry);
		const calIndex = get().allCalories.findIndex((w) => w.date === date);
		if (calIndex !== -1) {
			set((state) => {
				state.allCalories[calIndex].calories = calories;
				return { allCalories: state.allCalories };
			});
		} else {
			set((state) => {
				state.allCalories.push({ calories: calories, date: date });
				return { allCalories: state.allCalories };
			});
		}
		push();
	},
	targetCalories: 2000,
	setTargetCalories: (calories) => {
		if (DEBUG) console.log('Target calories set', calories);
		set({ targetCalories: calories });
		push();
	},
	getLastCalories: () => {
		const allCalories = get().allCalories;
		return allCalories.length > 0 ? allCalories.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)))[0].calories : 0;
	},
}));

const useExerciseStore = create((set, get) => ({
	allExercise: [],
	setState: ({ allExercise, targetExercise }) => {
		if (DEBUG) console.log('All exercise state set');
		set((state) => ({
			allExercise,
			targetExercise,
		}));
	},
	addExerciseEntry: (exercise, date) => {
		const newEntry = { exercise, date };
		if (DEBUG) console.log('Added new exercise entry:', newEntry);
		const exeIndex = get().allExercise.findIndex((w) => w.date === date);
		if (exeIndex !== -1) {
			set((state) => {
				state.allExercise[exeIndex].exercise = exercise;
				return { allExercise: state.allExercise };
			});
		} else {
			set((state) => {
				state.allExercise.push({ exercise: exercise, date: date });
				return { allExercise: state.allExercise };
			});
		}
		push();
	},
	targetExercise: 300,
	setTargetExercise: (exercise) => {
		if (DEBUG) console.log('Target exercise set', exercise);
		set({ targetExercise: exercise });
		push();
	},
	getLastExercise: () => {
		const allExercise = get().allExercise;
		return allExercise.length > 0 ? allExercise.sort((a, b) => dayjs(b.date).diff(dayjs(a.date)))[0].exercise : 0;
	},
}));

const useMilestonesStore = create((set, get) => ({
	milestonesGifts: [
		{ milestone: 1, gift: '50£ in T-shirts', claimed: false, targetWeight: 0, achieved: false },
		{ milestone: 2, gift: 'Extravagância para a Alba', claimed: false, targetWeight: 0, achieved: false },
		{ milestone: 3, gift: 'PC', claimed: false, targetWeight: 0, achieved: false },
	],
	setState: ({ milestonesGifts }) => {
		if (DEBUG) console.log('All milestones state set');
		set((state) => ({
			milestonesGifts,
		}));
	},
	setMilestonesGifts: (gifts) => {
		if (DEBUG) console.log('Milestones gifts modified:', gifts);
		set({ milestonesGifts: gifts });
		push();
	},
	getMilestonesGifts: (weightMilestones, currentWeight) => {
		const milestonesGifts = get().milestonesGifts.map((gift) => ({
			...gift,
			targetWeight: weightMilestones[gift.milestone - 1],
			achieved: currentWeight < weightMilestones[gift.milestone - 1],
		}));
		return milestonesGifts;
	},
}));

const useUserDataStore = create((set, get) => ({
	user: '',
	setUser: (user) => {
		listenForChanges(user);
		set({ user, ready: false });
	},
	ready: false,
	setReady: (ready) => {
		set({ ready });
	},
}));

const Store = { useWeightStore, useCaloriesStore, useExerciseStore, useMilestonesStore, useUserDataStore };
const listenForChanges = (user) => {
	if (DEBUG) console.log('trying to listening for user', user);
	if (user !== '') {
		if (DEBUG) console.log('Listening for user', user);
		onValue(ref(getDatabase(), user + '/data'), (snapshot) => {
			if (DEBUG) console.log('Got a snapshot change', user);
			if (user !== '') {
				pull(snapshot.val());
			}
		});
	}
};

export default Store;
