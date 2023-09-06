import { useRef } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";

export default function ConfirmDialog(props) {
	const descriptionElementRef = useRef(null);

	return (
		<div>
			<Dialog open={props.open} onClose={props.handleClose} scroll='paper'>
				<DialogContent dividers={true}>
					<div>{props.title}</div>
					<DialogContentText id='scroll-dialog-description' ref={descriptionElementRef} tabIndex={-1}>
						{props.children}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.handleClose} color='primary'>
						Cancel
					</Button>
					<Button onClick={props.handleConfirm} color='primary'>
						Continue
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
