import React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../titles/titles.component';
//import CoronavirusIcon from '@mui/icons-material/Coronavirus';

// Generate Order Data
function createData(id, name, email, status, infectedDay) {
  return { id, name, email, status, infectedDay };
}

const rows = [
  createData(
    '0',
    'Elvis Presley',
    'elvi@hai.com',
    '1',
    '0',
  ),
  createData(
    '1',
    'Paul McCartney',
    'Laron@jam.com',
    '1',
    '4',
    
  ),
  createData(
    '2',
    'Les Pol',
    'Laron@jam.com',
    '0',
    '0',),
  createData(
    '4',
    'Jon pal',
    'jaron@jam.com',
    '1',
    '5',
  ),
  createData(
    '13',
    'Jimmy plant',
    'jimn@jam.com',
    '1',
    '4',
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  return (
    <React.Fragment>
      <Title>Infections</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Infected Days</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell align="right">{row.infectedDay}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}