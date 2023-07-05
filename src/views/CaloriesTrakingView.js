import React from 'react';
import CalorieTracking from '../components/CalorieTracking';
import DataAnalysisVisualization from '../components/DataAnalysisVisualization';

function CaloriesTrakingView() {
	return (
		<div className="view">
			<CalorieTracking />
			<DataAnalysisVisualization />
		</div>
	);
}

export default CaloriesTrakingView;
