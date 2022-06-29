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

export default function FormDialog({ open, handleClose, data, onChange, handleFormSubmit }) {
    const { id, userid, no_transaction, item_id, item_name, quantity, price, discount, } = data;

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{id ? "Update " : "Create new "}</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField id="userid" value={userid} onChange={(e) => onChange(e)} placeholder="Enter userid" label="Userid" variant="outlined" margin="dense" fullWidth />
                        <TextField id="no_transaction" value={no_transaction} onChange={(e) => onChange(e)} placeholder="Enter no_transaction" label="No_Transaction" variant="outlined" margin="dense" fullWidth />
                        <TextField id="item_id" value={item_id} onChange={(e) => onChange(e)} placeholder="Enter item_id" label="Item_Id" variant="outlined" margin="dense" fullWidth />
                        <TextField id="item_name" value={item_name} onChange={(e) => onChange(e)} placeholder="Enter item_name" label="Item_Name" variant="outlined" margin="dense" fullWidth />
                        <TextField id="quantity" value={quantity} onChange={(e) => onChange(e)} placeholder="Enter quantity" label="Quantity" variant="outlined" margin="dense" fullWidth />
                        <TextField id="price" value={price} onChange={(e) => onChange(e)} placeholder="Enter price" label="Price" variant="outlined" margin="dense" fullWidth />
                        <TextField id="discount" value={discount} onChange={(e) => onChange(e)} placeholder="Enter discount" label="Discount" variant="outlined" margin="dense" fullWidth />
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

