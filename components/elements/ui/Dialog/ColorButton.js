import { withStyles } from "@mui/material";

export default ColorButton = withStyles(() => ({
    root: {
        color: '#000',
        backgroundColor: '#fff',
        '&:hover': {
            backgroundColor: '#f0f0ff',
        },
    },
}))(Button);
