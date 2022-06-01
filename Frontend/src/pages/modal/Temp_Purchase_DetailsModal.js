import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
import Select from "react-select";
import { InputSwitch } from "primereact/inputswitch";

// import DialogContentText from '@material-ui/core/DialogContentText';

export default function FormDialog({ open, handleClose, data, onChange, handleFormSubmit, handleActiveValue }) {
    const { id, userid, no_transaction, item_id, item_name, quantity, price, discount, status, } = data;

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{id ? "Update transaction" : "Create New transaction"}</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField id="userid" value={userid} onChange={(e) => onChange(e)} placeholder="Enter userid" label="UserId" variant="outlined" margin="dense" fullWidth />
                        <TextField id="no_transaction" value={no_transaction} onChange={(e) => onChange(e)} placeholder="Enter No_Transaction" label="No_Transaction" variant="outlined" margin="dense" fullWidth />
                        <TextField id="item_id" value={item_id} onChange={(e) => onChange(e)} placeholder="Enter Item_Id" label="Item_Id" variant="outlined" margin="dense" fullWidth />
                        <TextField id="item_name" value={item_name} onChange={(e) => onChange(e)} placeholder="Enter Item_Id" label="Item_Id" variant="outlined" margin="dense" fullWidth />
                        <TextField id="quantity" value={quantity} onChange={(e) => onChange(e)} placeholder="Enter Quantity" label="Quantity" variant="outlined" margin="dense" fullWidth />
                        <TextField id="price" value={price} onChange={(e) => onChange(e)} placeholder="Enter Price" label="Price" variant="outlined" margin="dense" fullWidth />
                        <TextField id="discount" value={discount} onChange={(e) => onChange(e)} placeholder="Enter Discount" label="Discount" variant="outlined" margin="dense" fullWidth />
                       {/* <TextField id="status" value={status} onChange={(e) => onChange(e)} placeholder="Enter Status" label="Status" variant="outlined" margin="dense" fullWidth /> */}
                       <h6>Status: </h6>
                        <InputSwitch checked={status == 1 ? true : false}
                        onChange={(e) => handleActiveValue(e.value)} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="outlined">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={() => handleFormSubmit()} variant="contained">
                        {id ? "Update" : "Submit"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
