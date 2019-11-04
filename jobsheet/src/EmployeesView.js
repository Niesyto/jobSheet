import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import employees from './Employee.js'
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
  }));



export default function EmployeesView(props){
    const classes = useStyles();

    
  function handleClick(id){
     props.setSelectedOption(2);
     props.setSelectedEmployee(id)
}

    return(
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">First Name</TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">Phone Number</TableCell>
                    <TableCell align="right">EDIT/DETAILS</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {employees.map(employee => (
                    <TableRow key={employee.id}>
                        <TableCell component="th" scope="row">
                            {employee.id}
                        </TableCell>
                        <TableCell align="right">{employee.firstName}</TableCell>
                        <TableCell align="right">{employee.lastName}</TableCell>
                        <TableCell align="right">{employee.phoneNumber}</TableCell>
                        <TableCell align="right">
                            <Fab color="primary" aria-label="edit" className={classes.fab} onClick={handleClick.bind(this,employee.id)}>
                                <EditIcon />
                            </Fab>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
      </Paper>
    )
}