import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import employees from './Employee.js'



const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
  }));


 
  

export default function EmployeeDetails(props){
    const classes = useStyles();

    function findEmployee(employee) {
        return employee.id === props.selectedEmployee;
      }

    const employeeIndex=employees.findIndex(findEmployee);


    return(
        <>
        {employees[employeeIndex].id}
        {employees[employeeIndex].firstName}
        {employees[employeeIndex].lastName}
        {employees[employeeIndex].phoneNumber}

        <Table className={classes.table} aria-label="projects table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Hours</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {employees[employeeIndex].projects.map(project => (
                    <TableRow key={project.id}>
                        <TableCell component="th" scope="row">
                            {project.id}
                        </TableCell>
                        <TableCell align="right">{project.hours}</TableCell> 
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        </>
    )
}