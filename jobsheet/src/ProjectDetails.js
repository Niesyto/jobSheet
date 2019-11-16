import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import ProjectEmployeesTable from './ProjectEmployeesTable';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
  }));


 
  
  const ProjectDetails = props => {
    const classes = useStyles();
	const {
        selectedProject,
        setSelectedProject,
        setSelectedOption
	} = props

	const [projects, setProjects] = useState(JSON.parse(localStorage.getItem(`projects`)))
	const [id, setId] = useState('');
	const [description, setDescription] = useState('');
	const [name, setName] = useState('');
	const [employees, setEmployees] = useState([]);

    function findProject(project) {
        return project.id === selectedProject;
    }

    
    useEffect( () => {
        if(selectedProject)
        {
            const projectIndex =projects.findIndex(findProject);
            setId(projects[projectIndex].id);
            setDescription(projects[projectIndex].description)
            setName(projects[projectIndex].name)
            setEmployees(projects[projectIndex].employees)
        }
    },[])

	const handleIdChange = event => {
		setId(event.target.value)
	}

	const handleNameChange = event => {
		setName(event.target.value)
    }
    
    const handleDelete= event => {
        const projectIndex =projects.findIndex(findProject);
        projects.splice(projectIndex,1);
        localStorage.setItem(`projects`, JSON.stringify(projects));
        setProjects(projects);
        setSelectedOption(1);
    };

	const handleDescriptionChange = event => {
		setDescription(event.target.value)
	}

	const handleEmployeeChange = employees => {
		setEmployees(employees)
	}

	const handleSave = e => {
		e.preventDefault()

		const newProject = {
			id,
			name,
			description,
			employees,
        }

            var newProjects=projects;
            if(newProjects===null)
                newProjects=[newProject];
            else if(selectedProject)  
            {
                const projectIndex =projects.findIndex(findProject);
                newProjects.splice(projectIndex,1);
                newProjects.push(newProject);
            }     
            else
                newProjects.push(newProject);
   
            localStorage.setItem(`projects`, JSON.stringify(newProjects));
            setSelectedProject(null);
            setProjects(newProjects);
            setSelectedOption(1);
	}

	return(

		<div style={{width:`50%`, minWidth:'335px'}}>
			<div style={{height:`44px`}}>
				<Typography variant='h6' edge='start' style={{display:`inline`}}>
							ID:
				</Typography>
				<TextField
					variant='outlined'
					value={id}
					onChange={handleIdChange}
					style={{marginTop:`0px`, float:`right`}}
					margin='dense'
					InputProps={{
						style:{fontSize:`1rem`},
					}}
				/>
			</div>

			<div style={{height:`44px`}}>
				<Typography variant='h6' edge='start' style={{display:`inline`}}>
							Name:
				</Typography>
				<TextField
					variant='outlined'
					value={name}
					onChange={handleNameChange}
					style={{marginTop:`0px`, float:`right`}}
					margin='dense'
					InputProps={{
						style:{fontSize:`1rem`},
					}}
				/>
			</div>

			<div style={{height:`44px`}}>
				<Typography variant='h6' edge='start' style={{display:`inline`}}>
							Description:
				</Typography>
				<TextField
					value={description}
					onChange={handleDescriptionChange}
					variant='outlined'
					style={{marginTop:`0px`, float:`right`}}
					margin='dense'
					InputProps={{
						style:{fontSize:`1rem`},
					}}
				/>
			</div>

			<ProjectEmployeesTable employees={employees} handleEmployeeChange={handleEmployeeChange} />

			<Fab color='primary' aria-label='save project' variant='extended' onClick={handleSave}>
				<SaveIcon /> Save project
			</Fab>
            <Fab color="secondary" aria-label="delete project" variant="extended" onClick={handleDelete}>
                <DeleteIcon />
                Delete project
            </Fab>
		</div>

	)

}

export default ProjectDetails

