import {
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField,
    TextFieldProps,
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";


export interface IOptions {
    key: string;
    value: string;
}
interface IProps {
    isRequired?: boolean;
    icon: ReactElement;
    options?: IOptions[];
    value?: string;
    readonly?: boolean;
    valueChange?: (value: string) => void;
    iconSize?: string;
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
    options = [],
    rows,
    multiline,
    readonly,
    valueChange,
    iconSize,
    defaultValue
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [isFocused, setIsFocused] = useState(false);
    const [selected, setSelected] = useState("");
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
        style: {
            margin: "0 2px 0 2px",
            transform: isFocused ? 'rotate(0deg)' : 'rotate(-90deg)',
            transition: 'all 0.3s ease-in-out',
            color: error ? 'red' : isFocused ? (error ? 'red' : '#1976d2') : 'gray',
            fontSize: iconSize ? iconSize : '18px',
        }
    });

    useEffect(() => {
        if (value != "")
            setSelected(value!);
    }, [value])

    useEffect(() => {
        valueChange && valueChange(selected);
    }, [selected])


    const InputSelect = () => {
        return (
            <FormControl fullWidth size="small" error={error}>
                <InputLabel id="demo-simple-select-filled-label">
                    {label}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={selected}
                    label={label}
                    name={name}
                    onChange={handleSelectChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}

                >
                    {options.map((data) => (
                        <MenuItem key={data.key} value={data.key}>
                            <div className="flex justify-center w-full">{data.value}</div>
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
            variant="outlined"
            onChange={onChange}
            error={error}
            helperText={helperText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            size="small"
            multiline={multiline}
            type={type}
            rows={rows}
            defaultValue={defaultValue}
            fullWidth
            InputProps={{
                readOnly: readonly
            }}

        />
    }
    const InputPassword = () => {
        return (
            <FormControl variant="outlined" size="small" error={error}>
                <InputLabel>{label}</InputLabel>
                <OutlinedInput
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    label={label}
                    name={name}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={onChange}
                    placeholder={isRequired ? "(requerido)" : ""}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                edge="end"
                                type="button"
                            >

                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                {helperText && <FormHelperText>{helperText}</FormHelperText>}
            </FormControl>)
    }
    const render = type === 'select' ? InputSelect() : type === 'password' ? InputPassword() : InputTextField()
    return (
        <span className="flex group relative">
            <div
                className="mr-1 px-1 text-red-500 rounded-md bg-[#f0f0f0] flex items-center justify-center  border-gray-500 ">
                {cloneIcon}
            </div>
            {render}
        </span>
    );
};