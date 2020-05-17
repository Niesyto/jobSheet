import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import useLocalStorage from '../utilities/useLocalStorage.js';
import AssignEmployeeTable from './AssignEmployeeTable.js'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    searchBar: {
        width: "75%",
        margin: "15px 12.5%"
    }
}));


export default function AssignEmployeesView(props) {
    const classes = useStyles();
    const [employees, setEmployees] = useLocalStorage([], "employees");
    const [searchInput, setSeachInput] = React.useState("");

    const displayedEmployees = employees.filter(matchSearch);

    function matchSearch(employee) {
        if (employee.firstName.includes(searchInput))
            return true;
        else if (employee.lastName.includes(searchInput))
            return true;
        else if (employee.phoneNumber.includes(searchInput))
            return true;
        else return false;
    }

    function updateEmployees(updatedEmployee) {
        let employeesCopy = employees;
        let index = employees.findIndex(x => x.id === updatedEmployee.id);
        employeesCopy[index] = updatedEmployee;
        setEmployees(employeesCopy);
    }

    function handleSearch(event) {
        setSeachInput(event.target.value);
    }

    return (
        <Paper className={classes.root}>
            <div ></div>
            <TextField
                autoFocus
                id="search"
                label="Seach"
                type="text"
                value={searchInput}
                onChange={handleSearch}
                variant="outlined"
                className={classes.searchBar}
            />
            {displayedEmployees.map((employee) =>
                <AssignEmployeeTable employee={employee} updateEmployees={updateEmployees} key={employee.id} />
            )}
        </Paper>
    );
}