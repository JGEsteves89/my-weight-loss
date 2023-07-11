import React from 'react';
import { Modal, Slide, Fade } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function ModalWindow({ open, onClose, children }) {
	const theme = useTheme();
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
							transform: 'translateX(-50%)',
							padding: '0.6rem',
							borderRadius: '8px',
							boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
							backgroundColor: theme.palette.background.paper,
						}}>
						{children}
					</div>
				</Slide>
			</Fade>
		</Modal>
	);
}
export default ModalWindow;
