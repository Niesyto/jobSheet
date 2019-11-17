import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';

export default function ExportEmployee(props){
    const [employee,setEmployee]=React.useState(props.employee)

    function exportCsv(){
        var csvRow=[];

        var data=[['ID','FirstName','LastName', 'PhoneNumber']]
        data.push([employee.id,employee.firstName,employee.lastName,employee.phoneNumber])
        data.push([])
        data.push(['Projects:'])
        data.push(['ProjectID','Hours']) 

        for(var i=0;i<employee.projects.length;i++){
            data.push([employee.projects[i].id,employee.projects[i].hours]);
        }

        for(var i=0;i<data.length;i++){
            csvRow.push(data[i].join(','));
        }
        var csvString=csvRow.join('\n');

        var csvString='data:text/csv;charset=utf-8'+csvString;

        var ready=encodeURI(csvString);

        var csvFile=document.createElement('a');
        csvFile.setAttribute('href',ready);
        //csvFile.target="_Blank";
        csvFile.setAttribute('download',"employeeData.csv")
        //document.body.appendChild(csvFile);
        console.log(csvFile);

        csvFile.click();
    }

    return(
        <Fab color="primary" aria-label="export employee" variant="extended" onClick={exportCsv} style={{width:"56px", height:"56px", borderRadius:"50%"}}>
            CSV
        </Fab>
    )
}