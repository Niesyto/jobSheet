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
import ProjectFrom from './ProjectForm.js'
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

const emptyProject = {
    name: "",
    id: "",
    description: ""
};

export default function ProjectsView(props) {
    const classes = useStyles();
    //Should input/edit form be shown
    const [isFormOpen, setIsFormOpen] = React.useState(false);
    //Project to edit
    const [selectedProject, setSelectedProjects] = React.useState(emptyProject);
    //Array of projects
    const [projects, setProjects] = useLocalStorage([], "projects");
    /*
    Refresher is here becouse we use nested object, and useEffect performs a shallow comparison on them, 
    thus the component would not update after changing employees
    */
    const [refresher, setRefresher] = React.useState(false);

    //Edit button handler
    function handleEdit(project) {
        if (project !== null)
            setSelectedProjects(project);
        else
            setSelectedProjects(emptyProject);
        setIsFormOpen(true);
    }

    //Delete button handler
    function handleDelete(project) {
        let index = projects.findIndex(x => x.id === project.id);
        let projectsCopy = projects;
        projectsCopy.splice(index, 1);
        setProjects(projectsCopy);
        setRefresher(!refresher);
    }

    //Effect run only when properties of selectedProject change
    useEffect(() => {
        if (selectedProject) {
            //Find selected project index in array
            let index = projects.findIndex(x => x.id === selectedProject.id);
            let projectsCopy = projects;
            //If editing
            if (index !== -1)
                //Replace project with edited one
                projectsCopy[index] = selectedProject;
            else if (selectedProject.id)
                //If adding, add employee to the back of the array
                projectsCopy.push(selectedProject);
            else return;
            //Save the array and refresh
            setProjects(projectsCopy);
            setRefresher(!refresher);
        }
    }, [selectedProject])



    //Form closing
    function closeForm() {
        setIsFormOpen(false);
    }

    return (
        <Paper className={classes.root}>
            <ProjectFrom isOpen={isFormOpen} project={selectedProject} closeForm={closeForm} saveProject={setSelectedProjects} />
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Description</TableCell>
                        <TableCell align="right">EDIT/DELETE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map(project => (
                        <TableRow key={project.id}>
                            <TableCell align="left">{project.name}</TableCell>
                            <TableCell align="left">{project.description}</TableCell>
                            <TableCell align="right">
                                <Fab color="primary" aria-label="edit" onClick={handleEdit.bind(this, project)}>
                                    <EditIcon />
                                </Fab>
                                <Fab color="secondary" aria-label="edit" onClick={handleDelete.bind(this, project)}>
                                    <DeleteIcon />
                                </Fab>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Fab color="primary" aria-label="add employee" variant="extended" className={classes.addButton} onClick={handleEdit.bind(this, null)}>
                <AddIcon />
                Add Project
            </Fab>
        </Paper>

    )
}