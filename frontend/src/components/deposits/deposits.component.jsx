import React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../titles/titles.component';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Recent Case</Title>
      <Typography component="p" variant="h5">
        Nayan Shrestha
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 17 October, 2021
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View All
        </Link>
      </div>
    </React.Fragment>
  );
}