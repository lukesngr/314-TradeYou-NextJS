import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Box, Paper, Typography, Grid, TextField, Stack, Tab, Tabs } from "@mui/material";
import { useState, useRef } from "react";
import { DataGrid } from '@mui/x-data-grid';
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const serviceRequestColumns = [
{ field: 'id', headerName: 'ID', width: 50 },
{field: 'dateTime', headerName: 'Date created', width: 100},
{field: 'name', headerName: 'Name', width: 150},
{field: 'user', headerName: 'Creator', width: 150},
{field: 'description', headerName: 'Description', width: 180},
{field: 'price', headerName: 'Price', type: 'number', width: 100},
{field: 'category', headerName: 'Category', width: 180},
{field: 'status', headerName: 'Status', width: 100}];

const paymentColumns = [
{ field: 'id', headerName: 'ID', width: 50 },
{field: 'dateTime', headerName: 'Date created',width: 100},
{field: 'amount', headerName: 'Amount',width: 150},
{field: 'serviceRequestID', headerName: 'Service Request ID', width: 180}];

const chargesColumns = [
{field: 'id', headerName: 'ID', width: 50 },
{field: 'amount', headerName: 'Charge'},
{field: 'dateTime', headerName: 'Date created',width: 100}];



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div role="tabpanel" hidden={value !== index} {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            {children}
          </Box>
        )}
      </div>
    );
}

  function generateReportFromRef(columns, data) {
    var autoTableHeaders = [];
    columns.forEach(function(item) {
        autoTableHeaders.push(item.headerName)
    });

    autoTableHeaders = [autoTableHeaders];

    var autoTableData = [];
    if(data != undefined) {
        data.forEach(function(item) {
            var autoTableRow = [];
            Object.values(item).forEach(function(value) {
                if(value.length != 0) {
                    autoTableRow.push(value)
                }
            })
            autoTableData.push(autoTableRow);
        })
    }

    var autoTableBody = autoTableHeaders.concat(autoTableData);
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.autoTable({
        body: autoTableBody,
        startY: 10,
        theme: 'grid'
    })
    pdf.save("pdf");
}

function ProfessionalSettings(props) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [radioGroupValue, setRadioGroupValue] = useState(props.MembershipPlan[0].category);
    const handleRadioChange = (event, newValue) => {
        setRadioGroupValue(newValue);
    }

    console.log(props)

    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState("password");
    const [email, setEmail] = useState(props.email);
    const [phone, setPhone] = useState(props.phone);
    const [address, setAddress] = useState(props.address);
    const [creditCardNumber, setCreditCardNumber] = useState(props.creditCardNumber);
    const [creditCardCVV, setCreditCardCVV] = useState(props.creditCardCVV);

    async function updateDetails() {   
        const category = "professional";
        const membershipID = props.MembershipPlan[0].id
        console.log({membershipID, username, password, email, phone, address, creditCardNumber, creditCardCVV, category, radioGroupValue})
        try {
            const req = await axios.post("/api/updateDetails", {membershipID, username, password, email, phone, address, creditCardNumber, creditCardCVV, category, radioGroupValue});
            if (req.status == 200) {
                toast.success('Updated details');
            }else{
                console.log(error)
            }
        }catch (error) {
            console.log(error)
        }
    }


    return (
    <Box sx={{border: 1, borderRadius: 5, m: 1 }}>
         <ToastContainer />
        <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Typography variant="h3" sx={{color: "black"}}>Settings</Typography>
        </Box>
        <Box sx={{display: 'flex', justifyContent: 'center', width: '100%'}}>
            <Paper elevation={3} sx={{m: 5, p: 3 }}>
                <Typography variant="h6">Payment Type</Typography>
                <FormControl>
                    <RadioGroup name="paymentType" value={radioGroupValue} onChange={handleRadioChange}>
                        <FormControlLabel value="membership" control={<Radio />} label="Membership - annual fee of $300 for no joining fee"></FormControlLabel>
                        <FormControlLabel value="commission" control={<Radio />} label="Commission fee - commission fee of $25 off every job"></FormControlLabel>
                    </RadioGroup>
                    <Button variant="contained" onClick={() => updateDetails(props.id)}>Update all details</Button>
                </FormControl>
                
            </Paper>
            <Paper elevation={3} sx={{m: 5, p: 3, width: 500 }}>
                <Stack direction="column">
                    <Typography variant="h6">Update Details</Typography>
                    <TextField name="userName" variant="standard" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <TextField name="userPassword" type="password" variant="standard" onChange={(e) => setPassword(e.target.value)} />
                    <TextField name="userEmail" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <TextField name="userPhone" variant="standard" value={phone} onChange={(e) => setPhone(e.target.value)}></TextField>
                    <TextField name="userAddress" variant="standard" value={address} onChange={(e) => setAddress(e.target.value)}></TextField>
                    <TextField name="userCardNumber" variant="standard" value={creditCardNumber} onChange={(e) => setCreditCardNumber(e.target.value)}></TextField>
                    <TextField name="userCardCVV" variant="standard" value={creditCardCVV} onChange={(e) => setCreditCardCVV(e.target.value)}></TextField>  
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
                    <DataGrid
                            rows={props.Payments}
                            columns={paymentColumns}
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
                    <Button variant="contained" onClick={() => generateReportFromRef(paymentColumns, props.Payments)}>Generate</Button>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DataGrid
                            rows={props.Charges}
                            columns={chargesColumns}
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
                    <Button variant="contained" onClick={() => generateReportFromRef(chargesColumns, props.Charges)}>Generate</Button>
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
                    <Button variant="contained" onClick={() => generateReportFromRef(serviceRequestColumns, props.ServiceRequest)}>Generate</Button>
                </TabPanel>
            </Paper>
        </Box>
    </Box>

    )
}

export default ProfessionalSettings;