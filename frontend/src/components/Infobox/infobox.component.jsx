import React from 'react';
import './infobox.component.css';
import { Card, CardContent, Typography } from '@mui/material';

export default function InfoBox({ title, cases, total, ...props }) {
    return (
        <Card
            onClick={props.onClick}
            style={{ width: 350 }}>
            <CardContent>
                <Typography className='infoBox__title' color="textSecondary">{title}</Typography>
                <h3 className='infoBox__cases'>{cases}</h3>
                <Typography className='infoBox__total'>{total} Total</Typography>
            </CardContent>
        </Card>
    );
}
