import React, { useState } from 'react';

function MilestonesAndRewards() {
	const [milestone, setMilestone] = useState('');
	const [reward, setReward] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		// Logic to handle form submission and milestone/reward tracking
		console.log('Milestone:', milestone);
		console.log('Reward:', reward);
		// You can add your own logic here to handle the milestone and reward data
		// For example, you can make an API request to save the milestone and reward data to a database
	};

	const handleMilestoneChange = (e) => {
		setMilestone(e.target.value);
	};

	const handleRewardChange = (e) => {
		setReward(e.target.value);
	};

	return (
		<div className="component">
			<h2>Milestones and Rewards</h2>
			<form onSubmit={handleSubmit}>
				<label htmlFor="milestoneInput">Milestone:</label>
				<input
					type="text"
					id="milestoneInput"
					value={milestone}
					onChange={handleMilestoneChange}
					placeholder="Enter milestone description"
					required
				/>

				<label htmlFor="rewardInput">Reward:</label>
				<input type="text" id="rewardInput" value={reward} onChange={handleRewardChange} placeholder="Enter reward description" required />

				<button type="submit">Set Milestone and Reward</button>
			</form>
		</div>
	);
}

export default MilestonesAndRewards;
