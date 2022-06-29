import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Button } from "@mui/material";
import FormDialog from "./modal/PurchaseTransactionModal";
import { DataGrid } from "@mui/x-data-grid";

const initialValue = { userid: "", no_transaction: "", item_id: "", item_name: "", quntity: "", price: "", discount: "", dob: "" };

function TransactionForm() {
    const [gridApi, setGridApi] = useState(null);
    const [open, setOpen] = React.useState(false);
    const [tableData, setTableData] = useState(null);
    const [formData, setFormData] = useState(initialValue);
    const [userid, setUserid] = useState("");
    const [no_transaction, setNo_Transaction] = useState("");
    const [PIC, setPIC] = useState("");
    const [transaction_date, setTransaction_date] = useState("");
    const [msg, setMsg] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFormData(initialValue);
    };

    const url = `http://localhost:5000/api/temp_purchase_details/`;
    const url_trans ="http://localhost:5000/api/purchase_transaction/"
    
    const columns = [
        { headerName: "UserId", field: "userid", type: "number", width: 100 },
        { headerName: "No_Transaction", field: "no_transaction", width: 200 },
        { headerName: "Item_Id", field: "item_id", width: 200 },
        { headerName: "Item_Name", field: "item_name", width: 200 },
        { headerName: "Quntity", field: "quntity", width: 200 },
        { headerName: "Price", field: "price", width: 200 },
        { headerName: "Discount", field: "discount", width: 200 },
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

    const Save = async (e) => {
        e.preventDefault();
        try {
            await axios.post(url_trans, {
                userid: userid,
                no_transaction: no_transaction,
                PIC: PIC,
                transaction_date: transaction_date,
            });
            gettemp_purchase_details();
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    // calling getUsers function for first time
    useEffect(() => {
        gettemp_purchase_details();

    }, []);

    //fetching user data from server
    const gettemp_purchase_details = () => {
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
                .then((resp) => gettemp_purchase_details());
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
                        gettemp_purchase_details();
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
                    gettemp_purchase_details();
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
            <div className="grid">
                <div className="col-12 md:col-6">
                    <div className="card p-fluid">
                        <section className="hero has-background-grey-light is-fullheight is-fullwidth">
                            <div className="hero-body">
                                <div className="container">
                                    <div className="columns is-centered">
                                        <div className="column is-4-desktop">
                                            <form onSubmit={Save} className="box">
                                                <p className="has-text-centered">{msg}</p>
                                                <div className="field mt-5">
                                                    <label className="label">userid</label>
                                                    <div className="controls">
                                                        <input type="text" className="input" placeholder="Userid" value={userid} onChange={(e) => setUserid(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="field mt-5">
                                                    <label className="label">no_transaction</label>
                                                    <div className="controls">
                                                        <input type="text" className="input" placeholder="No_Transaction" value={no_transaction} onChange={(e) => setNo_Transaction(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="field mt-5">
                                                    <label className="label">PIC</label>
                                                    <div className="controls">
                                                        <input type="text" className="input" placeholder="PIC" value={PIC} onChange={(e) => setPIC(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="field mt-5">
                                                    <label className="label">transaction_date</label>
                                                    <div className="controls">
                                                        <input type="text" className="input" placeholder="Transaction_Date" value={transaction_date} onChange={(e) => setTransaction_date(e.target.value)} />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <Grid align="right">
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    Add
                </Button>
            </Grid>
            <div className="ag-theme-alpine-dark" style={{ height: "400px" }}>
                <DataGrid
                    rows={tableData}
                    columns={columns}
                    pageSize={10}
                // disableColumnMenu
                />
                 <Grid align="right">
                <Button variant="contained" color="primary" onClick={Save}>
                   Save Tr
                </Button>
            </Grid>
            </div>
            <FormDialog open={open} handleClose={handleClose} data={formData} onChange={onChange} handleFormSubmit={handleFormSubmit} />
      
      
            <br/> <br/> <br/>
        </div>
      
    ); 
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(TransactionForm, comparisonFn);
