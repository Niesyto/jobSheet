import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

export default function ProjectEmployeesTable(props)
{
    const [projects, setProjects] = useState([]);
     //Nie wiem czemu, ale bez tego się nie odświeża, więc dodałem. Jakoś nie ogarnia że przy zmianie stanu tablicy też powinien się rerenderować
    const [refresher, setRefresher] = useState(true);      
    const [selectedId, setSelectedId] = useState(0); 
    const [dialogId, setDialogId] = useState('');
    const [dialogHours, setDialogHours] = useState('');
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
    setDialogId('');
    setDialogHours('');
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId('');
  };
   

    useEffect( () => {
        if(props.projects.length!==0){
            setProjects(props.projects);
            setRefresher(!refresher)
        }
    },[props.projects])

    const handleAddProject = () => {
        var tableProjects=props.projects;
        tableProjects.push({'id':" ", 'hours':" "})
        setProjects(tableProjects);
        setRefresher(!refresher)
        props.handleProjectsChange(tableProjects);
    }

    const handleDialogIdChange = event => {
		setDialogId(event.target.value)
    }
    
    const handleDialogHoursChange = event => {
		setDialogHours(event.target.value)
	}

    function findProject(project) {
        return project.id === selectedId;
    }

    const handleDelete= (id) => {
        function removeID(project) {
            return id !== project.id;
          }
        var tableProjects = projects.filter(removeID);
        setProjects(tableProjects);
        setRefresher(!refresher);
        props.handleProjectsChange(tableProjects);

    };

    function handleProjectChange() {
        const projectIndex =projects.findIndex(findProject);
        var tableProjects=props.projects;
        tableProjects[projectIndex].id=dialogId;
        tableProjects[projectIndex].hours=dialogHours;
        setProjects(tableProjects);
        setRefresher(!refresher)
        props.handleProjectsChange(tableProjects);
        setOpen(false);
        setSelectedId('');
	}

    return(
        <div>
        <Table style={{width:'100%'}} aria-label="projects table">
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Hours</TableCell>
                <TableCell align="right">Delete</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {projects.map((project) => (
            <TableRow key={project.id}>
                <TableCell >
                    <TextField
                        variant='outlined'
                        value={project.id}
                        onClick={handleClickOpen.bind(this,project.id)}      
                        margin='dense'
                        InputProps={{
                            style:{fontSize:`1rem`},
                        }}
                    />
                </TableCell>
                <TableCell align="right">
                    <TextField
                        variant='outlined'
                        value={project.hours}
                        stye={{float:"left"}}
                        onClick={handleClickOpen.bind(this,project.id)}
                        margin='dense'
                        InputProps={{
                            style:{fontSize:`1rem`},
                        }}
                    />
                </TableCell>
                <TableCell align="right">
                    <Fab color="secondary" aria-label="delete user" onClick={handleDelete.bind(this,project.id)}>
                        <DeleteIcon />
                    </Fab>
                </TableCell> 
            </TableRow>
                        ))}
        </TableBody>
    </Table>

    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit ID</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type in the new ID
          </DialogContentText>
          <TextField
            value={dialogId}
            onChange={handleDialogIdChange}
            autoFocus
            margin="dense"
            id="id"
            label="id"
            fullWidth
          />
          <DialogContentText>
            Type in the new hours
          </DialogContentText>
          <TextField
            value={dialogHours}
            onChange={handleDialogHoursChange}
            margin="dense"
            id="hours"
            label="hours"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleProjectChange} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

    <Fab color="primary" aria-label="add project" variant="extended" onClick={handleAddProject}>
        <AddIcon />
        Add project
    </Fab>
    </div>
    )
}