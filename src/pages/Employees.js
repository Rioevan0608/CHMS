import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import FormDialog from "./modal/EmployeesModal";
import { DataGrid } from "@mui/x-data-grid";

const initialValue = { 
    name: "", 
    email: "",
    phone: "",
    dob: "", 
    gender: "", 
    religion: "", 
    marital: "",     
    status: true,
};

function Employees() {
    const [gridApi, setGridApi] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [tableData, setTableData] = useState(null);
    const [formData, setFormData] = useState(initialValue);

    function handleActiveValue(e) {
        setFormData({ ...formData, status: e });
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData(initialValue);
    };

   const url = `http://localhost:5000/api/employees/`;
    //  const url = `http://frederickdumalawoffice.id/api/employees/`;
    const columnDefs = [
        { headerName: "Id", field: "id" },
        { headerName: "NIK", field: "nik" },
        { headerName: "Name", field: "name" },
        { headerName: "PlaceBirth", field: "place_birth" },
        { headerName: "DateBirth", field: "date_birth" },
        { headerName: "Email", field: "email" },
        { headerName: "Gender", field: "gender" },
        { headerName: "BloodType", field: "blood_type" },
        { headerName: "Address", field: "address" },
        { headerName: "RT", field: "rt " },
        { headerName: "RW", field: "rw " },
        { headerName: "Village", field: "village" },
        { headerName: "Districts", field: "districts" },
        { headerName: "Religion", field: "religion" },
        { headerName: "Marital", field: "marital" },
        { headerName: "Occupation", field: "occupation" },
        { headerName: "Citizen", field: "citizen" },
        { headerName: "PhoneNumber", field: "phone_number" },
        { headerName: "Status", field: "status" },
        {
            headerName: "Actions",
            field: "id",
            cellRendererFramework: (params) => (
                <div>
                    <Button variant="outlined" color="primary" onClick={() => handleUpdate(params.data)}>
                        Update
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(params.value)}>
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    const columns = [
        { headerName: "Id", field: "id", type: "number", width: 50 },
        { headerName: "NIK", field: "nik", type: "string", width: 150 },
        { headerName: "Name", field: "name", type: "string", width: 150 },
        { headerName: "PlaceBirth", field: "place_birth", type: "string", width: 100 },
        { headerName: "DateBirth", field: "date_birth", type: "string", width: 200 },
        { headerName: "Email", field: "email", type: "string", width: 150 },
        { headerName: "Gender", field: "gender", type: "string", width: 100 },
        { headerName: "BloodType", field: "blood_type", type: "string", width: 100 },
        { headerName: "Address", field: "address", width: 200 },
        { headerName: "Rt", field: "rt", width: 50 },
        { headerName: "Rw", field: "rw", width: 50 },
        { headerName: "Village", field: "village", width: 100 },
        { headerName: "Districts", field: "districts", width: 100 },
        { headerName: "Religion", field: "religion", width: 150 },
        { headerName: "Marital", field: "marital", width: 130 },
        { headerName: "Occupation", field: "occupation", width: 130 },
        { headerName: "Citizen", field: "citizen", width: 70 },
        { headerName: "PhoneNumber", field: "phone_number", width: 100 },
        { headerName: "Status", field: "status", width: 110, valueGetter: (params) => (params.row.status == 1 ? "Active" : "Not Active") },
        {
            field: "action",
            headerName: "Actions",
            sortable: false,
            width: 170,
            headerAlign:"center",
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking

                    const api = params.api;
                    const thisRow = {};

                    api.getAllColumns()
                        .filter((c) => c.field !== "__check__" && !!c)
                        .forEach((c) => (thisRow[c.field] = params.getValue(params.id, c.field)));

                    setFormData(thisRow, null, 4);
                    handleClickOpen();
                    // return alert(JSON.stringify(thisRow, null, 4));
                };

                // return <Button onClick={onClick} color="success" variant="outlined">Edit</Button>;
                return <Button onClick={onClick}>Edit</Button>;
            },
        },
    ];

    // calling getEmployees function for first time
    useEffect(() => {
        getEmployees();
    }, []);

    //fetching user data from server
    const getEmployees = () => {
        fetch(url)
            .then((resp) => resp.json())
            .then((resp) => setTableData(resp));
    };
    const onChange = (e) => {
        const { value, id } = e.target;
        // console.log(value,id)
        setFormData({ ...formData, [id]: value });
    };

    const handleGenderSelect = (e) => {
        const thisField = JSON.parse(JSON.stringify(e));
        setFormData({ ...formData, gender: thisField.value });
    };

    const handleReligionSelect = (e) => {
        const thisField = JSON.parse(JSON.stringify(e));
        setFormData({ ...formData, religion: thisField.value });
    };

    const handleMaritalSelect = (e) => {
        const thisField = JSON.parse(JSON.stringify(e));
        setFormData({ ...formData, marital: thisField.value });
    };

    const onGridReady = (params) => {
        setGridApi(params);
    };

    // setting update row data to form data and opening pop up window
    const handleUpdate = (oldData) => {
        alert(JSON.stringify(oldData));
        // return alert(JSON.stringify(thisRow, null, 4));
        setFormData(oldData);
        handleClickOpen();
    };
    //deleting a user
    const handleDelete = (id) => {
        alert("Nilainya-> " + id);
        const confirm = window.confirm("Are you sure, you want to delete this row", id);
        if (confirm) {
            fetch(url + `/${id}`, { method: "DELETE" })
                .then((resp) => resp.json())
                .then((resp) => getEmployees());
        }
    };

    const handleFormSubmit = () => {
        if (formData.id) {
            //updating a user
            const confirm = window.confirm("Are you sure, you want to update this row ?");
            confirm &&
                fetch(url + `/${formData.id}`, {
                    method: "PUT",
                    body: JSON.stringify(formData),
                    headers: {
                        "content-type": "application/json",
                    },
                })
                    .then((resp) => resp.json())
                    .then((resp) => {
                        handleClose();
                        getEmployees();
                    });
        } else {
            // adding new user
            fetch(url, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "content-type": "application/json",
                },
            })
                .then((resp) => resp.json())
                .then((resp) => {
                    handleClose();
                    getEmployees();
                });
        }
    };

    const defaultColDef = {
        sortable: true,
        flex: 1,
        filter: false,
        floatingFilter: false,
    };

    return (
        <div className="App">
            <h1 align="center">Employee Form</h1>
            <Grid align="right">
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Create New Employee
                </Button>
            </Grid>
            <div className="ag-theme-alpine-dark" style={{ height: "400px" }}>
                <DataGrid
                    rows={tableData}
                    columns={columns}
                    pageSize={10}
                    // disableColumnMenu
                />
            </div>
            <FormDialog open={open} 
            handleClose={handleClose} 
            data={formData} 
            onChange={onChange}
            handleFormSubmit={handleFormSubmit} 
            handleGenderSelect={handleGenderSelect} 
            handleReligionSelect={handleReligionSelect}  
            handleMaritalSelect={handleMaritalSelect} 
            handleActiveValue={handleActiveValue}
            />
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Employees, comparisonFn);
