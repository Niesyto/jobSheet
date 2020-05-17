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
import DeleteIcon from '@material-ui/icons/Delete';
import AssignEmployeeForm from './AssignEmployeeForm.js'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        marginBottom: "15px"
    },
    table: {
        minWidth: 650,
    },
    addButton: {
        margin: '10px'
    },
    titleText: {
        marginLeft: '15px'
    },
}));

const emptyProject = {
    name: "",
    hours: 0
};

export default function AssignEmployeesTable(props) {
    const classes = useStyles();
    const [employee, setEmployee] = React.useState(props.employee);
    const [isFormOpen, setFormOpen] = React.useState(false);
    const [refresher, setRefresher] = React.useState(false);
    const [selectedProject, setSelectedProject] = React.useState(emptyProject);
    const [index, setIndex] = React.useState(null);


    function handleEdit(index) {
        setSelectedProject(employee.projects[index]);
        setIndex(index);
        setFormOpen(true);
    }

    function handleAddNew() {
        setSelectedProject(emptyProject);
        setIndex(null);
        setFormOpen(true);
    }

    function handleClose() {
        setFormOpen(false);
    }

    function saveProject(project) {
        let newEmployee = employee;
        if (index === null)
            newEmployee.projects.push(project);
        else
            newEmployee.projects[index] = project
        newEmployee.totalHours = calculateTotalHours(newEmployee.projects);
        props.updateEmployees(newEmployee);
    }

    function calculateTotalHours(projects) {
        let total = parseInt(0);
        projects.forEach(function (project) {
            total += parseFloat(project.hours);
        })
        return total;
    }

    function handleDelete(index) {
        let newEmployee = employee;
        newEmployee.projects.splice(index, 1);
        props.updateEmployees(newEmployee);
        setRefresher(!refresher);
    }

    if (employee.projects.length === 0)
        return (
            <Paper className={classes.root}>
                <AssignEmployeeForm isOpen={isFormOpen} closeForm={handleClose} saveProjects={saveProject} project={selectedProject} />
                <Typography variant="h4" className={classes.titleText}>{employee.firstName} {employee.lastName}</Typography>
                <Typography variant="h6" className={classes.titleText}>No projects</Typography>
                <Fab color="primary" aria-label="add employee" variant="extended" className={classes.addButton} onClick={handleAddNew}>
                    <AddIcon />
                     Add Project
                </Fab>
            </Paper>
        )

    return (
        <Paper className={classes.root}>
            <AssignEmployeeForm isOpen={isFormOpen} closeForm={handleClose} saveProjects={saveProject} project={selectedProject} />
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <Typography variant="h4" className={classes.titleText}>{employee.firstName} {employee.lastName}</Typography>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Hours</TableCell>
                        <TableCell align="right">EDIT/DELETE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employee.projects.map((project, index) => (
                        <TableRow key={project.id}>
                            <TableCell align="left">{project.name}</TableCell>
                            <TableCell align="left">{project.hours}</TableCell>
                            <TableCell align="right">
                                <Fab color="primary" aria-label="edit" onClick={handleEdit.bind(this, index)}>
                                    <EditIcon />
                                </Fab>
                                <Fab color="secondary" aria-label="edit" onClick={handleDelete.bind(this, index)}>
                                    <DeleteIcon />
                                </Fab>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Fab color="primary" aria-label="add employee" variant="extended" className={classes.addButton} onClick={handleAddNew}>
                <AddIcon />
               Add Project
            </Fab>
        </Paper>
    );
}