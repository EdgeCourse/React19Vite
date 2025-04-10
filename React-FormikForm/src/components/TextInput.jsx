// components/TextInput.jsx
import React from 'react';
import TextField from '@mui/material/TextField';

const TextInput = ({ field, form, label, multiline = false, rows, ...props }) => {
  const errorText = form.touched[field.name] && form.errors[field.name];

  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      multiline={multiline}
      rows={rows}
      error={!!errorText}
      helperText={errorText}
      {...field}
      {...props}
    />
  );
};

export default TextInput;
