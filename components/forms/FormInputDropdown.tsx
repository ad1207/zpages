import { FormControl, InputLabel, MenuItem, Select} from "@mui/material"
import { Controller } from "react-hook-form"
import { FormInputProps } from "./FormInputProps"

export const FormInputDropdown: React.FC<FormInputProps> = ({
	name,
	label,
	control,
	defaultValue,
	options,
	width,
	children,
	onCustomChange = null,
}) => {
	const generateSingleOptions = () => {
		return options.map((option: any) => {
			return (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			);
		});
	};

	return (
		<FormControl size={'small'} style={{ width: width }}>
			<InputLabel>{label}</InputLabel>
			<Controller
				control={control}
				name={name}
				render={({ field: { onChange, value } }) => (
					<Select
						onChange={onCustomChange === null ? onChange : onCustomChange}
						value={value}
						defaultValue={defaultValue}
					>
						{/* {generateSingleOptions()} */}
						{children}
					</Select>
				)}
			/>
		</FormControl>
	);
};
