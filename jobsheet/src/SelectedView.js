import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EmployeesView from './EmployeesView';
import EmployeeDetails from './EmployeeDetails';
import ProjectsView from './ProjectsView';
import ProjectDetails from './ProjectDetails';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
    marginTop: '64px',
    display: "flex"
  },
  contentDetails: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
    marginTop: '64px'
  }
}));

  

export default function SelectedView(props){
    const classes = useStyles();
    const [selectedDetail, setSelectedDetail] = React.useState("");


    


    if(props.selectedOption===0)
    return(
        <main className={classes.content}>       
           <EmployeesView setSelectedEmployee={setSelectedDetail} setSelectedOption={props.setSelectedOption}/>  
        </main>
    )
    else if(props.selectedOption===1)
    return(
        <main className={classes.content}>       
           <ProjectsView setSelectedProject={setSelectedDetail} setSelectedOption={props.setSelectedOption}/>
        </main>
    )
    else if(props.selectedOption===2)
    return(
        <main className={classes.contentDetails}>       
           <EmployeeDetails selectedEmployee={selectedDetail}/>
        </main>
    )
    else if(props.selectedOption===3)
    return(
        <main className={classes.contentDetails}>       
           <ProjectDetails selectedProject={selectedDetail}/>
        </main>
    )
    else
    return(
      <main className={classes.content}>       
         SELECT SOMETHING
      </main>
  )
}