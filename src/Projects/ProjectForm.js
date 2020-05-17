import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import uniqueUUID from '../utilities/uniqueUUID.js';


export default function ProjectForm(props) {
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [saveEnabled, setSaveEnabled] = React.useState(true);

    useEffect(() => {
        if (props.isOpen) {
            setName(props.project.name);
            setDescription(props.project.description);
        }
    }, [props.project, props.isOpen])

    useEffect(() => {
        if (name && description)
            setSaveEnabled(false);
        else
            setSaveEnabled(true);
    }, [name, description])

    function handleSave() {
        let tempProject = {
            name: name,
            id: props.project.id,
            description: description,
        };
        props.project.id ? tempProject.id = props.project.id : tempProject.id = uniqueUUID("projects");
        props.saveProject(tempProject);
        props.closeForm(true);
    }

    const handleChange = (e) => {
        //Handle input edits, depending on TextField's id
        if (e.target.id === "name")
            setName(e.target.value);
        else if (e.target.id === "description")
            setDescription(e.target.value);
        else (console.log(e.target.id));
    }

    return (
        <Dialog open={props.isOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit Project</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Project name"
                    type="text"
                    required={true}
                    value={name}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    required={true}
                    value={description}
                    onChange={handleChange}
                    fullWidth
                />
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