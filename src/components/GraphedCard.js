import { Card, CardHeader, CardContent, CardActions, Button, Box } from '@mui/material';
import React, { useState } from 'react';

function DialogHandles() {
	const [isDialogVisible, setIsDialogVisible] = useState(false);
	const handleOpen = () => {
		setIsDialogVisible(true);
	};

	const handleClose = () => {
		setIsDialogVisible(false);
	};
	return {
		isDialogVisible,
		handleOpen,
		handleClose,
	};
}

function GraphedCard({ cardTitle, cardSubtitle, cardContent, cardActions, cardModalWindows }) {
	return (
		<Card sx={{ flexGrow: 1, overflow: 'visible' }}>
			<CardHeader title={cardTitle} subheader={cardSubtitle} />
			<CardContent sx={{ height: '100%' }}>{cardContent}</CardContent>
			<CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				{cardActions &&
					cardActions.map((cardAction, i) => {
						const { isDialogVisible, handleOpen, handleClose } = DialogHandles();

						return (
							<Box key={i}>
								<Button variant={cardAction.variant} color="primary" onClick={handleOpen}>
									{cardAction.text}
								</Button>
								{!!cardAction.modelWindow &&
									React.cloneElement(cardAction.modelWindow, { open: isDialogVisible, onClose: handleClose })}
							</Box>
						);
					})}
			</CardActions>
		</Card>
	);
}

export default GraphedCard;
