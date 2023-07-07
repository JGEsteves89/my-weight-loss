import React from 'react';
import { Modal, Slide, Fade } from '@mui/material';

function ModalWindow({ open, onClose, children }) {
	return (
		<Modal open={open} onClose={onClose} closeAfterTransition>
			<Fade in={open}>
				<Slide direction="up" in={open}>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							position: 'fixed',
							bottom: '0',
							left: '0',
							right: '0',
							margin: 'auto',
							width: '90%',
							maxWidth: '500px',
							transform: 'translateX(-50%)',
							padding: '0.6rem',
							borderRadius: '8px',
							boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
							backgroundColor: 'white',
						}}>
						{children}
					</div>
				</Slide>
			</Fade>
		</Modal>
	);
}
export default ModalWindow;
