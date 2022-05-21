import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import FormDialog from "./modal/UserModal";
import { DataGrid } from "@mui/x-data-grid";

const initialValue = { name: "", email: "", phone: "", dob: "" };

function UserForm() {
    const [gridApi, setGridApi] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [tableData, setTableData] = useState(null);
    const [formData, setFormData] = useState(initialValue);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData(initialValue);
    };

    const url = `http://localhost:5000/api/users/`;
    // const url = `http://frederickdumalawoffice.id/api/users/`;
    const columnDefs = [
        { headerName: "ID", field: "id" },
        { headerName: "Firstname", field: "firstname" },
        { headerName: "Lastname", field: "lastname" },
        { headerName: "email", field: "email" },
        { headerName: "Placeofbirth", field: "placeofbirth" },
        { headerName: "Birthdate", field: "birthdate" },
        { headerName: "Country", field: "country" },
        { headerName: "Current_location", field: "current_location" },
        { headerName: "timezone", field: "timezone" },            
        { headerName: "Phone", field: "phone" },
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
        { headerName: "ID", field: "id", type: "number", width: 100 },
        { headerName: "Firstname", field: "firstname", type: "string", width: 150 },
        { headerName: "Lastname", field: "lastname", type: "string", width: 200 },
        { headerName: "email", field: "email", type: "string", width: 150 },
        { headerName: "Placeofbirth", field: "placeofbirth", type: "string", width: 150 },
        { headerName: "Birthdate", field: "birthdate", width: 100 },
        { headerName: "Country", field: "country", width: 150 },
        { headerName: "Current_location", field: "current_location", width: 150 },
        { headerName: "timezone", field: "timezone", width: 100 },
        { headerName: "Phone", field: "phone", width: 100 },
        { headerName: "Status", field: "status", width: 150 },
        {
            field: "action",
            headerName: "Actions",
            sortable: false,
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

    // calling getUsers function for first time
    useEffect(() => {
        getUsers();
    }, []);

    //fetching user data from server
    const getUsers = () => {
        fetch(url)
            .then((resp) => resp.json())
            .then((resp) => setTableData(resp));
    };
    const onChange = (e) => {
        const { value, id } = e.target;
        // console.log(value,id)
        setFormData({ ...formData, [id]: value });
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
                .then((resp) => getUsers());
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
                        getUsers();
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
                    getUsers();
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
            <h1 align="center">User Setup</h1>
            <Grid align="right">
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Add user
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
            <FormDialog open={open} handleClose={handleClose} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(UserForm, comparisonFn);
