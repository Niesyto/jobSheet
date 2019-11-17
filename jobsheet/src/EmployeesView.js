import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import ExportEmployee from './ExportEmployee.js'

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

    const employees=JSON.parse(localStorage.getItem("employees"));

  function handleClick(id){
     props.setSelectedOption(2);
     props.setSelectedEmployee(id)
}

    if(employees===null)
    return( 
        <Paper className={classes.root}>
            <Fab color="primary" aria-label="add employee"  variant="extended" className={classes.fab} onClick={handleClick.bind(this,null)}>
                <AddIcon />
                Add employee
            </Fab>
        </Paper>
    )
    return(
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">First Name</TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">Phone Number</TableCell>
                    <TableCell align="right">Total Hours</TableCell>
                    <TableCell align="right">EDIT/DETAILS</TableCell>
                    <TableCell align="right">Report</TableCell>
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
                        <TableCell align="right">{employee.totalHours}</TableCell>
                        <TableCell align="right">
                            <Fab color="primary" aria-label="edit" className={classes.fab} onClick={handleClick.bind(this,employee.id)}>
                                <EditIcon />
                            </Fab>
                        </TableCell>
                        <TableCell align="right">
                           <ExportEmployee employee={employee}/>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <Fab color="primary" aria-label="add employee"  variant="extended" className={classes.fab} onClick={handleClick.bind(this,null)}>
            <AddIcon />
            Add employee
        </Fab>
        </Paper>
       
    )
}