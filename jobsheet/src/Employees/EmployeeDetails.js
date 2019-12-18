import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import EmployeeProjectsTable from './EmployeeProjectsTable';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
}));


const EmployeeDetails = props => {
    const classes = useStyles();
    const {
        selectedEmployee,
        setSelectedEmployee,
        setSelectedOption
    } = props

    const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem(`employees`)))
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [totalHours, setTotalHours] = useState('');
    const [projects, setProjects] = useState([]);

    function findEmployee(employee) {
        return employee.id === selectedEmployee;
    }

    useEffect(() => {
        if (selectedEmployee) {
            const employeeIndex = employees.findIndex(findEmployee);
            setId(employees[employeeIndex].id);
            setFirstName(employees[employeeIndex].firstName);
            setLastName(employees[employeeIndex].lastName);
            setPhoneNumber(employees[employeeIndex].phoneNumber);
            setTotalHours(employees[employeeIndex].totalHours);
            setProjects(employees[employeeIndex].projects);
        }
    }, [])

    const handleIdChange = event => {
        setId(event.target.value)
    }

    const handleFirstNameChange = event => {
        setFirstName(event.target.value)
    }

    const handleLastNameChange = event => {
        setLastName(event.target.value)
    }

    const handleTotalHoursChange = event => {
        setTotalHours(event.target.value)
    }

    const handlePhoneChange = event => {
        setPhoneNumber(event.target.value)
    }

    const handleDelete = event => {
        const employeeIndex = employees.findIndex(findEmployee);
        console.log(employeeIndex);
        employees.splice(employeeIndex, 1);
        localStorage.setItem(`employees`, JSON.stringify(employees));
        setEmployees(employees);
        setSelectedOption(0);
    };

    const handleProjectsChange = projects => {
        setProjects(projects)
    }

    const handleSave = e => {
        e.preventDefault()

        const newEmployee = {
            id,
            firstName,
            lastName,
            phoneNumber,
            projects,
            totalHours,
        }

        let newEmployees = employees;
        if (newEmployees === null)
            newEmployees = [newEmployee];
        else if (selectedEmployee) {
            const employeeIndex = employees.findIndex(findEmployee);
            newEmployees.splice(employeeIndex, 1);
            newEmployees.push(newEmployee);
        }
        else
            newEmployees.push(newEmployee);

        localStorage.setItem(`employees`, JSON.stringify(newEmployees));
        setSelectedEmployee(null);
        setEmployees(newEmployees);
        setSelectedOption(0);
    }



    return (
        <div style={{ width: '50%', minWidth: '335px' }}>
            <div style={{ height: "44px" }}>
                <Typography variant="h6" edge="start" style={{ display: "inline" }}>
                    ID:
                </Typography>
                <TextField
                    value={id}
                    onChange={handleIdChange}
                    variant="outlined"
                    style={{ marginTop: "0px", float: "right" }}
                    margin='dense'
                    InputProps={{
                        style: { fontSize: "1rem" }
                    }}
                />
            </div>

            <div style={{ height: "44px" }}>
                <Typography variant="h6" edge="start" style={{ display: "inline" }}>
                    First Name:
                </Typography>
                <TextField
                    value={firstName}
                    onChange={handleFirstNameChange}
                    variant="outlined"
                    style={{ marginTop: "0px", float: "right" }}
                    margin='dense'
                    InputProps={{
                        style: { fontSize: "1rem" }
                    }}
                />
            </div>

            <div style={{ height: "44px" }}>
                <Typography variant="h6" edge="start" style={{ display: "inline" }}>
                    Last Name:
                </Typography>
                <TextField
                    value={lastName}
                    onChange={handleLastNameChange}
                    variant="outlined"
                    style={{ marginTop: "0px", float: "right" }}
                    margin='dense'
                    InputProps={{
                        style: { fontSize: "1rem" }
                    }}
                />
            </div>

            <div style={{ height: "44px" }}>
                <Typography variant="h6" edge="start" style={{ display: "inline" }}>
                    Phone:
                </Typography>
                <TextField
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    variant="outlined"
                    style={{ marginTop: "0px", float: "right" }}
                    margin='dense'
                    InputProps={{
                        style: { fontSize: "1rem" }
                    }}
                />
            </div>

            <div style={{ height: "44px" }}>
                <Typography variant="h6" edge="start" style={{ display: "inline" }}>
                    Total Hours:
                </Typography>
                <TextField
                    value={totalHours}
                    onChange={handleTotalHoursChange}
                    variant="outlined"
                    style={{ marginTop: "0px", float: "right" }}
                    margin='dense'
                    InputProps={{
                        style: { fontSize: "1rem" }
                    }}
                />
            </div>

            <EmployeeProjectsTable projects={projects} handleProjectsChange={handleProjectsChange} />

            <Fab color='primary' aria-label='save employee' variant='extended' onClick={handleSave} >
                <SaveIcon />
                Save employee
            </Fab>
            <Fab color="secondary" aria-label="delete employee" variant="extended" onClick={handleDelete} >
                <DeleteIcon />
                Delete employee
            </Fab>
        </div>
    )
}

export default EmployeeDetails