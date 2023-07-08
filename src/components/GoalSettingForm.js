import React from 'react';
import { Box } from '@mui/material';
import SetTargetsForm from './SetTargetForm';

function GoalSettingForm() {
	return (
		<div className="component">
			<Box style={{ paddingInline: '1rem' }}>
				<div className="justify">
					<h2 className="base-card-title">Goal Setting</h2>
				</div>
				<SetTargetsForm />
			</Box>
		</div>
	);
}

export default GoalSettingForm;
