import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
// import DialogContentText from '@material-ui/core/DialogContentText';

export default function FormDialog({ open, handleClose, data, onChange, handleFormSubmit }) {
    const { id, tribes, suku } = data;

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{id ? "Update tribes" : "Create new tribes"}</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField id="tribes" value={tribes} onChange={(e) => onChange(e)} placeholder="Enter tribes" label="tribes" variant="outlined" margin="dense" fullWidth />
                        <TextField id="suku" value={suku} onChange={(e) => onChange(e)} placeholder="Enter suku" label="suku" variant="outlined" margin="dense" fullWidth />
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
