import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import uniqueUUID from '../utilities/uniqueUUID.js';


export default function EmployeeForm(props) {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [saveEnabled, setSaveEnabled] = React.useState(true);

    useEffect(() => {
        if (props.isOpen) {
            setFirstName(props.employee.firstName);
            setLastName(props.employee.lastName);
            setPhoneNumber(props.employee.phoneNumber);
        }
    }, [props.employee, props.isOpen])

    useEffect(() => {
        if (firstName && lastName && phoneNumber)
            setSaveEnabled(false);
        else
            setSaveEnabled(true);
    }, [firstName, lastName, phoneNumber])

    function handleSave() {
        let tempEmployee = {
            firstName: firstName,
            id: props.employee.id,
            lastName: lastName,
            phoneNumber: phoneNumber,
            totalHours: props.employee.totalHours,
            projects: props.employee.projects
        };
        props.employee.id ? tempEmployee.id = props.employee.id : tempEmployee.id = uniqueUUID("employees");
        props.saveEmployee(tempEmployee);
        props.closeForm(true);
    }

    const handleChange = (e) => {
        //Handle input edits, depending on TextField's id
        if (e.target.id === "firstName")
            setFirstName(e.target.value);
        else if (e.target.id === "lastName")
            setLastName(e.target.value);
        else if (e.target.id === "phoneNumber")
            setPhoneNumber(e.target.value);
        else (console.log(e.target.id));
    }

    return (
        <Dialog open={props.isOpen} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Edit employee</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="firstName"
                    label="First Name"
                    type="text"
                    required={true}
                    value={firstName}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="lastName"
                    label="Last Name"
                    type="text"
                    required={true}
                    value={lastName}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="phoneNumber"
                    label="Phone Number"
                    type="tel"
                    required={true}
                    value={phoneNumber}
                    onChange={handleChange}
                    fullWidth
                />

            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={props.closeForm}>
                    Cancel
            </Button>
                <Button color="primary" disabled={saveEnabled} onClick={handleSave}>
                    Save
            </Button>
            </DialogActions>
        </Dialog>
    );
}