import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import projects from './Projects.js'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
  }));


 
  

export default function ProjectDetails(props){
    const classes = useStyles();

    const [id, setId] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [name, setName] = React.useState("");

    const handleIdChange = event => {
       setId(event.target.value);
    };
    const handleNameChange = event => {
        setName(event.target.value);
     };
     const handleDescriptionChange = event => {
        setDescription(event.target.value);
     };

     function handleAdd() {
        var projects=JSON.parse(localStorage.getItem("projects"));
        var newProj={'id':id,'name':name,'description':description}
        if(projects===null)
        {
            projects=[newProj];
            localStorage.setItem("projects", JSON.stringify(projects));
        }
        else
        {
            projects.push(newProj);
            localStorage.setItem("projects", JSON.stringify(projects));
        }

    }
     
        
    
   if(props.selectedProject===null)
   return(
      
        <div style={{width:'25%'}}>
            <div style={{height:"44px"}}>
                <Typography variant="h6"  edge="start" style={{display:"inline"}}>
                ID:
                </Typography>
                <TextField 
                        variant="outlined"
                        value={id}
                        onChange={handleIdChange}
                        style={{marginTop:"0px", float:"right"}}
                        margin='dense'
                        InputProps={{
                            style:{fontSize:"1rem"}
                        }}    
                    />
            </div>

            <div style={{height:"44px"}}>
                <Typography variant="h6"  edge="start" style={{display:"inline"}}>
                Name: 
                </Typography>
                <TextField 
                        variant="outlined"
                        value={name}
                        onChange={handleNameChange}
                        style={{marginTop:"0px", float:"right"}}
                        margin='dense'
                        InputProps={{
                            style:{fontSize:"1rem"}  
                        }}    
                    />
            </div>

            <div style={{height:"44px"}}>
                <Typography variant="h6"  edge="start" style={{display:"inline"}}>
                Description:
                </Typography>
                <TextField 
                        value={description}
                        onChange={handleDescriptionChange}
                        variant="outlined"
                        style={{marginTop:"0px", float:"right"}}
                        margin='dense'
                        InputProps={{
                            style:{fontSize:"1rem"}
                        }}    
                    />
            </div>
            <Fab color="primary" aria-label="delete user" variant="extended" onClick={handleAdd}>
                <SaveIcon />
                Save project
        </Fab>
        </div>

   );






  
    const projectIndex =projects.findIndex(findProject);
    console.log(projectIndex);
     

    function findProject(project) {
        return project.id === props.selectedProject;
      }


    return(
        <div>
        <div style={{width:'25%'}}>
            <div style={{height:"44px"}}>
                <Typography variant="h6"  edge="start" style={{display:"inline"}}>
                ID:
                </Typography>
                <TextField 
                        placeholder={projects[projectIndex].id}
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
                Name: 
                </Typography>
                <TextField 
                        placeholder={projects[projectIndex].name}
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
                Description:
                </Typography>
                <TextField 
                        placeholder={projects[projectIndex].description}
                        variant="outlined"
                        style={{marginTop:"0px", float:"right"}}
                        margin='dense'
                        InputProps={{
                            style:{fontSize:"1rem"}
                        }}    
                    />
            </div>
        </div>


        <Table style={{width:'25%'}} aria-label="projects table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Hours</TableCell>
                        <TableCell align="right">Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {projects[projectIndex].employees.map((employee, index) => (
                    <TableRow key={employee.employeeID}>
                        <TableCell component="th" scope="row">
                            {employee.employeeID}
                        </TableCell>
                        <TableCell align="right">
                            <Fab color="secondary" aria-label="delete user" >
                                <DeleteIcon />
                            </Fab>
                        </TableCell> 
                    </TableRow>
                                ))}
                </TableBody>
            </Table>

            <Fab color="secondary" aria-label="delete user" variant="extended">
                <DeleteIcon />
                Delete user
            </Fab>
        </div>
    )
}