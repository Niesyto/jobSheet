import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import employees from './Employee.js'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';

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
    
   

   
    const employeeIndex =employees.findIndex(findEmployee);
    console.log(employeeIndex);
     

    function findEmployee(employee) {
        return employee.id === props.selectedEmployee;
      }

  

   


    const handleDeleteRow= index => event => {
        employees[employeeIndex].projects.splice(index, 1);
    }

    const handleDelete= event => {
        employees.splice(employeeIndex,1)
    };

    const handleFirstChange = event => {
        employees[employeeIndex].firstName=event.target.value;
    };

    const handleLastChange = event => {
        employees[employeeIndex].lastName=event.target.value;
    };

    const handlePhoneChange = event => {
        employees[employeeIndex].phoneNumber=event.target.value;
    };

    const handleIdChange = event => {
        employees[employeeIndex].id=event.target.value;
    };

   


    return(
        <div>
        <div style={{width:'25%'}}>
            <div style={{height:"44px"}}>
                <Typography variant="h6"  edge="start" style={{display:"inline"}}>
                ID:
                </Typography>
                <TextField 
                        placeholder={employees[employeeIndex].id}
                        variant="outlined"
                        style={{marginTop:"0px", float:"right"}}
                        margin='dense'
                        onChange={handleIdChange}
                        InputProps={{
                            style:{fontSize:"1rem"}
                        }}    
                    />
            </div>

            <div style={{height:"44px"}}>
                <Typography variant="h6"  edge="start" style={{display:"inline"}}>
                First Name: 
                </Typography>
                <TextField 
                        placeholder={employees[employeeIndex].firstName}
                        onChange={handleFirstChange}
                        variant="outlined"
                        style={{marginTop:"0px", float:"right"}}
                        margin='dense'
                        InputProps={{
                            style:{fontSize:"1rem"}  
                        }}    
                    />
            </div>

            <div style={{height:"44px"}}>
                <Typography variant="h6"  edge="start" style={{display:"inline"}}>
                Last Name: 
                </Typography>
                <TextField 
                        placeholder={employees[employeeIndex].lastName}
                        onChange={handleLastChange}
                        variant="outlined"
                        style={{marginTop:"0px", float:"right"}}
                        margin='dense'
                        InputProps={{
                            style:{fontSize:"1rem"}
                        }}    
                    />
            </div>

            <div style={{height:"44px"}}>
                <Typography variant="h6"  edge="start" style={{display:"inline"}}>
                Phone:  
                </Typography>
                <TextField 
                        placeholder={employees[employeeIndex].phoneNumber}
                        onChange={handlePhoneChange}
                        variant="outlined"
                        style={{marginTop:"0px", float:"right"}}
                        margin='dense'
                        InputProps={{
                            style:{fontSize:"1rem"}
                        }}    
                    />
            </div>
        </div>
        
        <Typography variant="h6"  edge="start" style={{display:"inline"}}>
                        Projects:
        </Typography>

        <Table style={{width:'25%'}} aria-label="projects table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Hours</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {employees[employeeIndex].projects.map((project, index) => (
                    <TableRow key={project.id}>
                        <TableCell component="th" scope="row">
                            {project.id}
                        </TableCell>
                        <TableCell align="right">{project.hours}</TableCell> 
                        <TableCell align="right">
                            <Fab color="secondary" aria-label="delete user" onClick={handleDeleteRow(index)}>
                                <DeleteIcon />
                            </Fab>
                        </TableCell> 
                    </TableRow>
                                ))}
                </TableBody>
            </Table>

            <Fab color="secondary" aria-label="delete user" variant="extended" onClick={handleDelete}>
                <DeleteIcon />
                Delete user
            </Fab>
        </div>
    )
}