import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
// import DialogContentText from '@material-ui/core/DialogContentText';

export default function FormDialog({ open, handleClose, data, onChange, handleFormSubmit }) {
    const { id, question, answer } = data;

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{id ? "Update question" : "Create new question"}</DialogTitle>
                <DialogContent>
                    <form>
                        <TextField id="question" value={question} onChange={(e) => onChange(e)} placeholder="Enter question" label="Question" variant="outlined" margin="dense" fullWidth />
                        <TextField id="answer" value={answer} onChange={(e) => onChange(e)} placeholder="Enter answer" label="Answer" variant="outlined" margin="dense" fullWidth />
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
