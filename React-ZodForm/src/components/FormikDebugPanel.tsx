import React from 'react';
import { Box } from '@mui/material';
import { FormikContextType, useFormikContext } from 'formik';

const FormikDebugPanel: React.FC = () => {
  const formik: FormikContextType<any> = useFormikContext();

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <Box
      mt={4}
      p={2}
      sx={{
        background: '#f5f5f5',
        fontFamily: 'monospace',
        fontSize: 12,
        whiteSpace: 'pre-wrap',
        overflowX: 'auto',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}
    >
      <strong>Formik Debug Panel</strong>
      <pre>{JSON.stringify(formik, null, 2)}</pre>
    </Box>
  );
};

export default FormikDebugPanel;
