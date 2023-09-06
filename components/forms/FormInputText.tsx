import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { FormInputProps } from "./FormInputProps";

export const FormInputText = ({ name, control, label, variant, onCustomChange = null }: FormInputProps) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
				<TextField
					helperText={error ? error.message : null}
					size='small'
					error={!!error}
					onChange={onCustomChange === null ? onChange : onCustomChange}
					value={value}
					fullWidth
					label={label}
					// variant={variant === undefined ? 'outlined' : variant}
					variant='standard'
					InputLabelProps={{ shrink: true }}
				/>
			)}
		/>
	);
};