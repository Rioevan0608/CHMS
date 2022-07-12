import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import FormDialog from "./modal/Users_Search.Modal";
import { DataGrid } from "@mui/x-data-grid";
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { CountryService } from '../service/CountryService';


const initialValue = { name: "", email: "", phone: "", dob: "" };

function Report_UserForm() {
    const [gridApi, setGridApi] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [tableData, setTableData] = useState(null);
    const [formData, setFormData] = useState(initialValue);
    const [selectedAutoValue, setSelectedAutoValue] = useState(null);
    const [countries, setCountries] = useState([]);
    const [filteredCountries, setFilteredCountries] = useState(null);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState(null);
    const [value4, setValue4] = useState('');
    const [value5, setValue5] = useState('');
    const [value6, setValue6] = useState('');
    const [value7, setValue7] = useState('');
    const [value8, setValue8] = useState('');
    const [value9, setValue9] = useState([]);
    const [value10, setValue10] = useState(null);

    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' },
        { name: 'Indonesia', code: 'IND' },
        { name: 'Germany', code: 'GMY' },
    ];

    useEffect(() => {
        const countryService = new CountryService();
        countryService.getCountries().then((countries) => {
            setCountries(countries);
        });
    }, []);

    const searchCountry = (event) => {
        const filtered = [];
        const query = event.query;
        for (let i = 0; i < countries.length; i++) {
            const country = countries[i];
            if (country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                filtered.push(country);
            }
        }
        setFilteredCountries(filtered);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData(initialValue);
    };

    const url = `http://localhost:5000/api/Users_Search/`;
    // const url = `http://frederickdumalawoffice.id/api/Users_search/`;
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
                return (
                    <>
                        <Button onClick={onClick}>Edit</Button>
                        <Button color="primary" onClick={() => handleDelete(params.id)}>
                            Delete
                        </Button>
                    </>
                );
            },
        },
    ];

    // calling getUsers_search_search function for first time
    useEffect(() => {
        getUsers_Search();
    }, []);

    //fetching user data from server
    const getUsers_Search = () => {
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
        const confirm = window.confirm("Are you sure, you want to delete this row: " + id, id);
        if (confirm) {
            fetch(url + `/${id}`, { method: "DELETE" })
                .then((resp) => resp.json())
                .then((resp) => getUsers_Search());
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
                        getUsers_Search();
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
                    getUsers_Search();
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
            <div className="card">
                <h5></h5>
                <div className="grid p-fluid mt-3">
                    <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                            <InputText type="text" id="inputtext" value={value1} onChange={(e) => setValue1(e.target.value)} />
                            <label htmlFor="inputtext">InputText</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                            <InputMask id="inputmask" mask="99/99/9999" value={value2} onChange={(e) => setValue2(e.value)}></InputMask>
                            <label htmlFor="inputmask">InputMask</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-4">
                        <span className="p-float-label">
                            <Dropdown id="dropdown" options={cities} value={value8} onChange={(e) => setValue8(e.value)} optionLabel="name"></Dropdown>
                            <label htmlFor="dropdown">Dropdown</label>
                        </span>
                    </div>
                </div>
            </div>
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
                handleFormSubmit={handleFormSubmit} />
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Report_UserForm, comparisonFn);
