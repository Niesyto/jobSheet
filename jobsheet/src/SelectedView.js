import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EmployeesView from './Employees/EmployeesView';
import EmployeeDetails from './Employees/EmployeeDetails';
import ProjectsView from './Projects/ProjectsView';
import ProjectDetails from './Projects/ProjectDetails';
import Typography from '@material-ui/core/Typography';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
    marginTop: '64px',
    display: "flex",
    minWidth: "350px"
  },
  contentDetails: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
    marginTop: '64px',
    minWidth: "350px"
  }
}));

export default function SelectedView(props) {
  const classes = useStyles();
  const [selectedDetail, setSelectedDetail] = React.useState("");


  if (props.selectedOption === 0)
    return (
      <main className={classes.content}>
        <EmployeesView setSelectedEmployee={setSelectedDetail} setSelectedOption={props.setSelectedOption} />
      </main>
    )
  else if (props.selectedOption === 1)
    return (
      <main className={classes.content}>
        <ProjectsView setSelectedProject={setSelectedDetail} setSelectedOption={props.setSelectedOption} />
      </main>
    )
  else if (props.selectedOption === 2)
    return (
      <main className={classes.contentDetails}>
        <EmployeeDetails selectedEmployee={selectedDetail} setSelectedEmployee={setSelectedDetail} setSelectedOption={props.setSelectedOption} />
      </main>
    )
  else if (props.selectedOption === 3)
    return (
      <main className={classes.contentDetails}>
        <ProjectDetails selectedProject={selectedDetail} setSelectedProject={setSelectedDetail} setSelectedOption={props.setSelectedOption} />
      </main>
    )
  else
    return (
      <main className={classes.content}>
        <Typography variant="h1" edge="start" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          WELCOME
           </Typography>
      </main>
    )
}