import React, { useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useLocalStorage from '../utilities/useLocalStorage.js';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    select: {
        marginTop: "23px",
        marginLeft: "15px",
        minWidth: "180px"
    },
    hoursInput: {
        width: "60px"
    },
}));


export default function AssignEmployeeForm(props) {
    const [saveEnabled, setSaveEnabled] = React.useState(true);
    const [projects, setProjects] = useLocalStorage([], "projects");
    const [hours, setHours] = React.useState(props.project.hours);
    const [projectName, setProjectName] = React.useState(props.project.name);;

    const classes = useStyles();

    useEffect(() => {
        if (projectName && hours)
            setSaveEnabled(false);
        else
            setSaveEnabled(true);
    }, [projectName, hours])

    useEffect(() => {
        if (props.project) {
            setHours(props.project.hours);
            setProjectName(props.project.name);
        }
    }, [props.project])

    function handleSave() {
        props.saveProjects({ name: projectName, hours: hours });
        props.closeForm();
    }

    const handleHoursEdit = (event) => {
        setHours(event.target.value);
    }

    const handleProjectChange = (event) => {
        setProjectName(event.target.value);
    }

    return (
        <Dialog open={props.isOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Assign employee to projects</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="hours"
                    label="Hours"
                    type="number"
                    required={true}
                    value={hours}
                    className={classes.hoursInput}
                    onChange={handleHoursEdit}
                />
                <Select
                    labelId="project-select-laber"
                    id="project-select"
                    value={projectName}
                    className={classes.select}
                    onChange={handleProjectChange}
                >
                    {projects.map((project) =>
                        <MenuItem value={project.name} key={project.id}>
                            {project.name}
                        </MenuItem>
                    )}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={props.closeForm}>
                    Cancel
            </Button>
                <Button color="primary" disabled={saveEnabled} onClick={handleSave}>
                    Save
            </Button>
            </DialogActions>
        </Dialog>
    );
}