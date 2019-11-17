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
    const [employees, setEmployees] = useState([]);
     //Nie wiem czemu, ale bez tego się nie odświeża, więc dodałem. Jakoś nie ogarnia że przy zmianie stanu tablicy też powinien się rerenderować
    const [refresher, setRefresher] = useState(true);      
    const [selectedId, setSelectedId] = useState(0); 
    const [dialogId, setDialogId] = useState('');
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = (employeeID) => {
    setSelectedId(employeeID);
    setOpen(true);
    setDialogId('');
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId('');
  };
   

    useEffect( () => {
        if(props.employees.length!==0){
            setEmployees(props.employees);
            setRefresher(!refresher)
        }
    },[props.employees])

    const handleAddEmployee = () => {
        var tableEmployees=props.employees;
        tableEmployees.push({'employeeID':"1"})
        setEmployees(tableEmployees);
        setRefresher(!refresher)
        props.handleEmployeeChange(tableEmployees);
    }

    const handleDialogIdChange = event => {
		setDialogId(event.target.value)
	}

    function findEmployee(employee) {
        return employee.employeeID === selectedId;
    }

    const handleDelete= (employeeID) => {
        function removeID(employee) {
            return employeeID !== employee.employeeID;
          }
        var tableEmployees = employees.filter(removeID);
        setEmployees(tableEmployees);
        setRefresher(!refresher);
        props.handleEmployeeChange(tableEmployees);

    };

    function handleIdChange() {
        const employeeIndex =employees.findIndex(findEmployee);
        var tableEmployees=props.employees;
        tableEmployees[employeeIndex].employeeID=dialogId;
        setEmployees(tableEmployees);
        setRefresher(!refresher)
        props.handleEmployeeChange(tableEmployees);
        setOpen(false);
        setSelectedId('');
	}

    return(
        <div>
        <Table style={{width:'100%'}} aria-label="projects table">
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Delete</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {employees.map((employee) => (
            <TableRow key={employee.employeeID}>
                <TableCell >
                  <TextField
                    variant='outlined'
                    value={employee.employeeID}
                    onClick={handleClickOpen.bind(this,employee.employeeID)}
                    margin='dense'
                    InputProps={{
                      style:{fontSize:`1rem`},
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                    <Fab color="secondary" aria-label="delete user" onClick={handleDelete.bind(this,employee.employeeID)}>
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
            id="name"
            label="id"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleIdChange} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

    <Fab color="primary" aria-label="add employee" variant="extended" onClick={handleAddEmployee}>
        <AddIcon />
        Add employee
    </Fab>
    </div>
    )
}