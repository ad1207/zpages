import { Snackbar, Alert } from "@mui/material";

const SnackBar = (props) => {
    return (
        <>
            <Snackbar open={props.open} autoHideDuration={3000} onClose={props.handleClose}>
                <Alert onClose={props.handleClose} elevation={6} variant="filled" severity="success">
                    {props.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default SnackBar;
