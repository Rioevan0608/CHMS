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
    const { id, id_church, churchname, address, status } = data;

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{id ? "Update Church" : "Create New Church"}</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField id="id_church" value={id_church} onChange={(e) => onChange(e)} placeholder="Enter Id_Church" label="Id_Church" variant="outlined" margin="dense" fullWidth />
                        <TextField id="churchname" value={churchname} onChange={(e) => onChange(e)} placeholder="Enter ChurchName" label="ChurchName" variant="outlined" margin="dense" fullWidth />
                        <TextField id="address" value={address} onChange={(e) => onChange(e)} placeholder="Enter Address" label="Address" variant="outlined" margin="dense" fullWidth />
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
