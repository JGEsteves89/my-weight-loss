import React from 'react';
import CalorieTracking from '../components/CalorieTracking';
import DataAnalysisVisualization from '../components/DataAnalysisVisualization';
import ExerciseTracking from '../components/ExerciseTracking';
import GoalSettingForm from '../components/GoalSettingForm';
import WeightTrackingForm from '../components/WeightTrackingForm';

function HomeView() {
	return (
		<div>
			<WeightTrackingForm />
			<GoalSettingForm />
			<CalorieTracking />
			<ExerciseTracking />
			<DataAnalysisVisualization />
		</div>
	);
}

export default HomeView;
