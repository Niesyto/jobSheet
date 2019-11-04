import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EmployeesView from './EmployeesView';
import EmployeeDetails from './EmployeeDetails';
import ProjectsView from './ProjectsView';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
    marginTop: '64px',
    display: "flex"
  }
}));

  

export default function SelectedView(props){
    const classes = useStyles();
    const [selectedEmployee, setSelectedEmployee] = React.useState("");



    if(props.selectedOption===0)
    return(
        <main className={classes.content}>       
           <EmployeesView setSelectedEmployee={setSelectedEmployee} setSelectedOption={props.setSelectedOption}/>  
        </main>
    )
    else if(props.selectedOption===1)
    return(
        <main className={classes.content}>       
           <ProjectsView/>
        </main>
    )
    else if(props.selectedOption===2)
    return(
        <main className={classes.content}>       
           <EmployeeDetails selectedEmployee={selectedEmployee}/>
        </main>
    )
    else
    return(
      <main className={classes.content}>       
         SELECT SOMETHING
      </main>
  )
}