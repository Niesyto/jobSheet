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


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
  }));


  

export default function ProjectsView(props){
    const classes = useStyles();
    

   
    const projects=JSON.parse(localStorage.getItem("projects"));

    function handleClick(id){
        props.setSelectedOption(3);
        props.setSelectedProject(id)
   }

   if(projects===null)
   return( 
    <Paper className={classes.root}>
         <Fab color="primary" aria-label="add project"  variant="extended" className={classes.fab} onClick={handleClick.bind(this,null)}>
            <AddIcon />
            Add project
        </Fab>
    </Paper>
    )
    else
    return(
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell align="right">Name</TableCell>
                    <TableCell align="right">Description</TableCell>
                    <TableCell align="right">EDIT/DETAILS</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {projects.map(project => (
                    <TableRow key={project.id}>
                        <TableCell component="th" scope="row">
                            {project.id}
                        </TableCell>
                        <TableCell align="right">{project.name}</TableCell>
                        <TableCell align="right">{project.description}</TableCell>
                        <TableCell align="right">
                            <Fab color="primary" aria-label="edit" className={classes.fab} onClick={handleClick.bind(this,project.id)}>
                                <EditIcon />
                            </Fab>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
        <Fab color="primary" aria-label="add project"  variant="extended" className={classes.fab} onClick={handleClick.bind(this,null)}>
            <AddIcon />
            Add project
        </Fab>
      </Paper>
    )
}