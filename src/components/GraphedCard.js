import { Card, CardHeader, CardContent, CardActions, Button } from '@mui/material';
import React from 'react';

import ModalWindow from './ModalWindow';

function GraphedCard({ cardTitle, cardSubtitle, cardContent, cardActions, cardModalWindows }) {
	return (
		<Card sx={{ flexGrow: 1, overflow: 'visible' }}>
			<CardHeader title={cardTitle} subheader={cardSubtitle} />
			<CardContent sx={{ height: '100%' }}>{cardContent}</CardContent>
			<CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
				{cardActions.map((cardAction, i) => {
					return (
						<Button variant={cardAction.variant} color="primary" onClick={cardAction.handleClick} key={i}>
							{cardAction.text}
						</Button>
					);
				})}
			</CardActions>
			{cardModalWindows.map((modalWindowHtml, i) => {
				return (
					<ModalWindow open={modalWindowHtml.open} onClose={modalWindowHtml.handleClose} key={i}>
						{modalWindowHtml.html}
					</ModalWindow>
				);
			})}
		</Card>
	);
}

export default GraphedCard;
