import React, { useEffect } from 'react';
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
import DeleteIcon from '@material-ui/icons/Delete';
import ExportEmployee from './ExportEmployee.js'
import EmployeeForm from './EmployeeForm.js'
import useLocalStorage from '../utilities/useLocalStorage.js';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
    addButton: {
        margin: '10px'
    }
}));

const emptyEmployee = {
    firstName: "",
    id: "",
    lastName: "",
    phoneNumber: "",
    totalHours: 0,
    projects: []
};

export default function EmployeesView(props) {
    const classes = useStyles();
    //Should input/edit form be shown
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    //Employee to edit
    const [selectedEmployee, setSelectedEmployee] = React.useState(emptyEmployee);
    //Array of employees
    const [employees, setEmployees] = useLocalStorage([], "employees");
    /*
    Refresher is here becouse we use nested object, and useEffect performs a shallow comparison on them, 
    thus the component would not update after changing employees
    */
    const [refresher, setRefresher] = React.useState(false);

    //Edit button handler
    function handleEdit(employee) {
        if (employee !== null)
            setSelectedEmployee(employee);
        else
            setSelectedEmployee(emptyEmployee);
        setIsFormOpen(true);
    }

    //Delete button handler
    function handleDelete(employee) {
        let index = employees.findIndex(x => x.id === employee.id);
        let employeesCopy = employees;
        employeesCopy.splice(index, 1);
        setEmployees(employeesCopy);
        setRefresher(!refresher);
    }

    //Effect run only when certain properties of selectedEmployee change
    useEffect(() => {
        if (selectedEmployee) {
            //Find selected employee index in array
            let index = employees.findIndex(x => x.id === selectedEmployee.id);
            let employeesCopy = employees;
            //If editing
            if (index !== -1)
                //Replace employee with edited one
                employeesCopy[index] = selectedEmployee;
            else if (selectedEmployee.id)
                //If adding, add employee to the back of the array
                employeesCopy.push(selectedEmployee);
            else return;
            //Save the array and refresh
            setEmployees(employeesCopy);
            setRefresher(!refresher);
        }
    }, [selectedEmployee])



    //Form closing
    function closeForm() {
        setIsFormOpen(false);
    }

    return (
        <Paper className={classes.root}>
            <EmployeeForm isOpen={isFormOpen} employee={selectedEmployee} closeForm={closeForm} saveEmployee={setSelectedEmployee} />
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">First Name</TableCell>
                        <TableCell align="left">Last Name</TableCell>
                        <TableCell align="left">Phone Number</TableCell>
                        <TableCell align="left">Total Hours</TableCell>
                        <TableCell align="left">EDIT/DELETE</TableCell>
                        <TableCell align="right">Report</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees.map(employee => (
                        <TableRow key={employee.id}>
                            <TableCell align="left">{employee.firstName}</TableCell>
                            <TableCell align="left">{employee.lastName}</TableCell>
                            <TableCell align="left">{employee.phoneNumber}</TableCell>
                            <TableCell align="left">{employee.totalHours}</TableCell>
                            <TableCell align="left">
                                <Fab color="primary" aria-label="edit" onClick={handleEdit.bind(this, employee)}>
                                    <EditIcon />
                                </Fab>
                                <Fab color="secondary" aria-label="edit" onClick={handleDelete.bind(this, employee)}>
                                    <DeleteIcon />
                                </Fab>
                            </TableCell>
                            <TableCell align="right">
                                <ExportEmployee employee={employee} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Fab color="primary" className={classes.addButton} aria-label="add employee" variant="extended" onClick={handleEdit.bind(this, null)}>
                <AddIcon />
                Add employee
            </Fab>
        </Paper>
    )
}