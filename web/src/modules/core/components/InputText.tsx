import {
    FilledInput,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    TextFieldProps
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
    iconSize
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
            variant="filled"
            onChange={onChange}
            error={error}
            helperText={helperText}
            onFocus={handleFocus}
            onBlur={handleBlur}
            size="small"
            multiline={multiline}
            type={type}
            rows={rows}
            fullWidth
            InputProps={{
                readOnly: readonly
            }}

        />
    }
    const InputPassword = () => {
        return (
            <FormControl variant="filled" size="small" error={error}>
                <InputLabel>Password</InputLabel>
                <FilledInput
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    sx={{paddingLeft:"30px"}}
                    name={name}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChange={onChange}
                    placeholder={isRequired ? "(requerido)" : ""}
                    endAdornment={
                        <InputAdornment sx={{marginLeft:"20px"}} position="end">
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
    return (
        <span className="flex">
            <div
                className="mr-1 px-1 text-red-500 rounded-t-md bg-[#f0f0f0] flex items-center justify-center border-b-[1px] border-gray-500 ">
                {cloneIcon}
            </div>
            {type === 'select' ? InputSelect() : type === 'password' ? InputPassword() : InputTextField()}
        </span>
    );
};