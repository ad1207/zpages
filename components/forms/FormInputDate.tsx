import DateFnsUtils from "@date-io/date-fns"
import {DatePicker, LocalizationProvider} from "@mui/lab"
import { Controller } from "react-hook-form"
import {FormInputProps} from "./FormInputProps"

const DATE_FORMAT = "dd-MMM-yy";

export const FormInputDate = ({ name, control, label }: FormInputProps) => {
  return (
    <LocalizationProvider utils={DateFnsUtils}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
          <DatePicker
            fullWidth
            variant="inline"
            defaultValue={new Date()}
            id={`date-${Math.random()}`}
            label={label}
            rifmFormatter={(val) => val.replace(/[^[a-zA-Z0-9-]*$]+/gi, "")}
            refuse={/[^[a-zA-Z0-9-]*$]+/gi}
            autoOk
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
            format={DATE_FORMAT}
            {...field}
          />
        )}
      />
    </LocalizationProvider>
  );
};