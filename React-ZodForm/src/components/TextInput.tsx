import React from 'react';
import TextField from '@mui/material/TextField';
import { FieldProps } from 'formik';

type Props = FieldProps & {
  label: string;
  multiline?: boolean;
  rows?: number;
};

const TextInput: React.FC<Props> = ({ field, form, label, multiline = false, rows, ...props }) => {
  const error = form.touched[field.name] && form.errors[field.name];

  return (
    <TextField
      {...field}
      {...props}
      fullWidth
      variant="outlined"
      label={label}
      multiline={multiline}
      rows={rows}
      error={!!error}
      helperText={error as string}
    />
  );
};

export default TextInput;
