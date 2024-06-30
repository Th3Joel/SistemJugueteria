import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    TextFieldProps
} from "@mui/material";
import React, {ReactElement, useState} from "react";


interface IOptions {
    key: string;
    value: string;
}
interface IProps{
    isRequired?: boolean;
    icon: ReactElement;
    options?: IOptions[];
}

type InputProps = TextFieldProps & IProps;
export const InputText: React.FC<InputProps> = ({
                                                                     label,
                                                                     name,
                                                                     value,
                                                                     onChange,
                                                                     error,
                                                                     helperText,
                                                                     type = "text",
                                                                     isRequired = false,
                                                                     icon,
                                                                     options = []
                                                                 }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [selected, setSelected] = useState(options[0]?.key);
    const handleFocus = () => {
        setIsFocused(true);
    };
    const handleBlur = () => {
        setIsFocused(false);
    };
    const handleSelectChange = (event: SelectChangeEvent) => {
        setSelected(event.target.value as string);
    }
    const cloneIcon = React.cloneElement(icon, {
        color:error ? 'error' : isFocused ? (error ? 'error' : 'primary') : 'action',
        sx:{transform: isFocused ? 'rotate(0deg)' : 'rotate(-90deg)',transition: 'all 0.3s ease-in-out'}
    });
    const InputSelect = () => {
        return (
            <FormControl fullWidth variant="filled" size="small" error={error}>
                <InputLabel id="demo-simple-select-filled-label">
                    {label}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={selected}
                    name={name}
                    onChange={handleSelectChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                >
                    {options.map((data, index) => (
                        <MenuItem key={index} value={data.key}>
                            {data.value}
                        </MenuItem>
                    ))}
                </Select>
                {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>
        );
    }
    const InputTextField = () => {
        return <TextField
            label={label}
            name={name}
            value={value}
            placeholder={isRequired ? "(requerido)" : ""}
            variant="filled"
            onChange={onChange}
            error={error}
            helperText={helperText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            size="small"
            type={type}
            fullWidth
        />
    }
    return (
        <span className="flex">
          <div
              className="mr-1 px-1 text-red-500 rounded-t-md bg-[#f0f0f0] flex items-center justify-center border-b-[1px] border-gray-500 ">
              {cloneIcon}
          </div>
            {type === 'select' ? InputSelect() : InputTextField()}
      </span>
    );
};