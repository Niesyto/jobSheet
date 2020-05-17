import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EmployeesView from './Employees/EmployeesView';
import ProjectsView from './Projects/ProjectsView';
import Typography from '@material-ui/core/Typography';
import AssignEmployeesView from './AssignEmployees/AssignEmployeesView';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
    marginTop: '64px',
    display: "flex",
    minWidth: "350px"
  }
}));

export default function SelectedView(props) {
  const classes = useStyles();


  if (props.selectedOption === 0)
    return (
      <main className={classes.content}>
        <EmployeesView/>
      </main>
    )
  else if (props.selectedOption === 1)
    return (
      <main className={classes.content}>
        <ProjectsView />
      </main>
    )
    else if (props.selectedOption === 2)
    return (
      <main className={classes.content}>
        <AssignEmployeesView  />
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