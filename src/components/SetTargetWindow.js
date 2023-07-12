import React from 'react';
import ModalWindow from './ModalWindow';
import SetTargetsForm from './SetTargetForm';

function SetTargetWindow({ open, onClose }) {
	return (
		<ModalWindow open={open} onClose={onClose}>
			<SetTargetsForm onClose={onClose} />
		</ModalWindow>
	);
}

export default SetTargetWindow;
