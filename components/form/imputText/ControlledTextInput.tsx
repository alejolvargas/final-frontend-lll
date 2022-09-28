import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import React from 'react'
import { FC } from "react";
import { Controller, useController, useFormContext } from "react-hook-form";

type ControlledTextProps = {
    name: string,
    label: string,
    defaultValue?: string;
    type?: string,
}



const ControlledTextInput: FC<ControlledTextProps> = ({ name, label, defaultValue, type = "text" }: ControlledTextProps ) => {
    const { control } = useFormContext ();
    const {
        field: { onChange, value, ref },
        formState: { errors }
    } = useController<Record<string, string>>({
        name: name, // Si falla,
        // name: `${name}` as const,
        control,
        defaultValue,
    }); 


  return (
    <Box mb={2}>
        <TextField
            onChange={onChange}
            value={value}
            label={label}
            inputRef={ref}
              type={type}
            fullWidth
            error={!!errors[name]}
            helperText={`${errors[name]?.message || ''}`}
        />
    </Box>
  )
}

export default ControlledTextInput