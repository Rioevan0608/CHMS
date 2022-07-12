import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
// import Select from "react-select";
import { InputSwitch } from "primereact/inputswitch";

// import DialogContentText from '@material-ui/core/DialogContentText';

export default function FormDialog({ open, handleClose, data, onChange, handleFormSubmit, handleActiveValue }) {
    const { id, firstname, lastname, email, placeofbirth, birthdate, country, current_location, timezone, phone, status } = data;

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{id ? "Update user" : "Create new user"}</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField id="firstname" value={firstname} onChange={(e) => onChange(e)} placeholder="Enter firstname" label="firstname" variant="outlined" margin="dense" fullWidth />
                        <TextField id="lastname" value={lastname} onChange={(e) => onChange(e)} placeholder="Enter lastname" label="lastname" variant="outlined" margin="dense" fullWidth />
                        <TextField id="email" value={email} onChange={(e) => onChange(e)} placeholder="Enter email" label="Email" variant="outlined" margin="dense" fullWidth />
                        <TextField id="placeofbirth" value={placeofbirth} onChange={(e) => onChange(e)} placeholder="Enter placeofbirth" label="placeofbirth" variant="outlined" margin="dense" fullWidth />
                        <TextField id="birthdate" value={birthdate} onChange={(e) => onChange(e)} placeholder="Enter birthdate" label="birthdate" variant="outlined" margin="dense" fullWidth />
                        <TextField id="country" value={country} onChange={(e) => onChange(e)} placeholder="Enter country" label="country" variant="outlined" margin="dense" fullWidth />
                        <TextField id="current_location" value={current_location} onChange={(e) => onChange(e)} placeholder="Enter current_location" label="current_location" variant="outlined" margin="dense" fullWidth />
                        <TextField id="timezone" value={timezone} onChange={(e) => onChange(e)} placeholder="Enter timezone" label="timezone" variant="outlined" margin="dense" fullWidth />
                        <TextField id="phone" value={phone} onChange={(e) => onChange(e)} placeholder="Enter Phone Number" label="phone" variant="outlined" margin="dense" fullWidth />
                        {/* <TextField id="status" value={status} onChange={(e) => onChange(e)} placeholder="Enter status" label="status" variant="outlined" margin="dense" fullWidth /> */}
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
