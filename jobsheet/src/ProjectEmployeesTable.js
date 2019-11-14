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

export default function ProjectEmployeesTable(props)
{
    const [employees, setEmployees] = useState([]);
     //Nie wiem czemu, ale bez tego się nie odświeża, więc dodałem. Jakoś nie ogarnia że przy zmianie stanu tablicy też powinien się rerenderować
    const [refresher, setRefresher] = useState(true);      
    const [selectedId, setSelectedId] = useState(0); 
    var idd=0;
   

    useEffect( () => {
        if(props.employees.length!=0){
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

    function findEmployee(employee) {
        return employee.employeeID === idd;
    }

    const handleDelete= (employeeID) => {
        function removeID(employee) {
            return employeeID != employee.employeeID;
          }
        var tableEmployees = employees.filter(removeID);
        setEmployees(tableEmployees);
        setRefresher(!refresher);
        props.handleEmployeeChange(tableEmployees);

    };

    function handleIdChange(id,event) {
        idd=id;
        var tableEmployees = employees;
        const employeeIndex=employees.findIndex(findEmployee);
        console.log(idd,id,employeeIndex);
        tableEmployees[employeeIndex].employeeID=event.target.value;
        setEmployees(tableEmployees);
        props.handleEmployeeChange(tableEmployees);
        setRefresher(!refresher)
	}

    return(
        <div>
        <Table style={{width:'25%'}} aria-label="projects table">
        <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Hours</TableCell>
                <TableCell align="right">Delete</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
        {employees.map((employee) => (
            <TableRow key={employee.employeeID}>
                <TextField
					variant='outlined'
					value={employee.employeeID}
					onChange={(event) => handleIdChange(employee.employeeID,event)}
					style={{marginTop:`0px`, float:`right`}}
					margin='dense'
					InputProps={{
						style:{fontSize:`1rem`},
					}}
				/>
                <TableCell align="right">
                    <Fab color="secondary" aria-label="delete user" onClick={handleDelete.bind(this,employee.employeeID)}>
                        <DeleteIcon />
                    </Fab>
                </TableCell> 
            </TableRow>
                        ))}
        </TableBody>
    </Table>


    <Fab color="primary" aria-label="add employee" variant="extended" onClick={handleAddEmployee}>
        <AddIcon />
        Add employee
    </Fab>
    </div>
    )
}