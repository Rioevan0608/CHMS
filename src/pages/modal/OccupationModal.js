import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
// import DialogContentText from '@material-ui/core/DialogContentText';

export default function FormDialog({ open, handleClose, data, onChange, handleFormSubmit }) {
    const { id, occupation, pekerjaan } = data;

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{id ? "Update Occupation" : "Create new occupation"}</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField id="occupation" value={occupation} onChange={(e) => onChange(e)} placeholder="Enter occupation" label="Occupation" variant="outlined" margin="dense" fullWidth />
                        <TextField id="pekerjaan" value={pekerjaan} onChange={(e) => onChange(e)} placeholder="Enter pekerjaan" label="Pekerjaan" variant="outlined" margin="dense" fullWidth />
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
