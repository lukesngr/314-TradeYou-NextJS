import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Box, Paper, Typography, Grid, TextField, Stack, Tab, Tabs } from "@mui/material";
import { useState, useRef } from "react";
import { DataGrid } from '@mui/x-data-grid';
import jsPDF from "jspdf";
import { render } from "react-dom";
import { renderToString } from "react-dom/server";
import { autoTable } from "jspdf-autotable";

const serviceRequestColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {field: 'dateTime', headerName: 'Date created', width: 100},
    {field: 'name', headerName: 'Name', width: 150},
    {field: 'userName', headerName: 'Creator', width: 150},
    {field: 'description', headerName: 'Description', width: 180},
    {field: 'price', headerName: 'Price', type: 'number', width: 100},
    {field: 'category', headerName: 'Category', width: 180},
    {field: 'status', headerName: 'Status', width: 100}];

    const paymentColumns = [
        { field: 'id', headerName: 'ID', width: 50 },
        {field: 'dateTime',headerName: 'Date created',width: 100},
        {field: 'name', headerName: 'Creator',width: 150},
        {field: 'description', headerName: 'Description', width: 180},
        {field: 'price', headerName: 'Price', type: 'number', width: 100},
        {field: 'category', headerName: 'Category', width: 180},
        {field: 'status', headerName: 'Status', width: 100}];

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }

function ProfessionalSettings(props) {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function generateReportFromRef() {
        var autoTableHeaders = [];
        serviceRequestColumns.forEach(function(item) {
            autoTableHeaders.push(item.headerName)
        });
        autoTableHeaders = [autoTableHeaders];
        var autoTableData = [];
        if(props.ServiceRequest != undefined) {
            props.ServiceRequest.forEach(function(item) {
                var autoTableRow = [];
                Object.values(item).forEach(function(value) {
                    autoTableRow.push(value)
                })
                autoTableData.push(autoTableRow);
            })
        }
        var autoTableBody = autoTableHeaders.concat(autoTableData);
        console.log(props.ServiceRequest);
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.autoTable({
            body: autoTableBody,
            startY: 10,
            theme: 'grid'
        })
        pdf.save("pdf");
    }

    return (
    <Box sx={{border: 1, borderRadius: 5, m: 1 }}>
        <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Typography variant="h3" sx={{color: "black"}}>Settings</Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'space-evenly', width: '100%'}}>
            <Paper elevation={3} sx={{m: 5, p: 3 }}>
                <Typography variant="h6">Payment Type</Typography>
                <FormControl>
                    <RadioGroup defaultValue="membership" name="paymentType">
                        <FormControlLabel value="membership" control={<Radio />} label="Membership - annual fee of $300 for no joining fee"></FormControlLabel>
                        <FormControlLabel value="commission" control={<Radio />} label="Commission fee - commission fee of $25 off every job"></FormControlLabel>
                    </RadioGroup>
                    <Button variant="contained">Update all details</Button>
                </FormControl>
                
            </Paper>
            <Paper elevation={3} sx={{m: 5, p: 3, width: 500 }}>
                <Stack direction="column">
                    <Typography variant="h6">Update Details</Typography>
                    <TextField name="userName" variant="standard" value={props.username}/>
                    <TextField name="userPassword" type="password" variant="standard" value="password" />
                    <TextField name="userEmail" variant="standard" value={props.email}/>
                    <TextField name="userPhone" variant="standard" value={props.phone}></TextField>
                    <TextField name="userAddress" variant="standard" value={props.address}></TextField>
                    <TextField name="userCardNumber" variant="standard" value={props.creditCardNumber}></TextField>
                    <TextField name="userCardCVV" variant="standard" value={props.creditCardCVV}></TextField>  
                </Stack>             
            </Paper>
        </Box>
        <Box sx={{display: 'inline-flex', justifyContent: 'center', width: '100%'}}>
            <Paper elevation={5} sx={{p: 3}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Payment Reports" />
                        <Tab label="Charges Reports" />
                        <Tab label="Service Request Reports" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <DataGrid
                        rows={props.ServiceRequest}
                        columns={serviceRequestColumns}
                        initialState={{
                        pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                        },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />
                    <Button variant="contained" onClick={() => generateReportFromRef()}>Generate</Button>
                </TabPanel>
            </Paper>
        </Box>
    </Box>

    )
}

export default ProfessionalSettings;