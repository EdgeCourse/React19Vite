
/*
import React from 'react';
import { Formik, Form, Field } from 'formik';
import { contactSchema, ContactFormValues } from '../validationSchema';
import TextInput from './TextInput';
import SubmitButton from './SubmitButton';
import { Box } from '@mui/material';

const ContactForm: React.FC = () => {
  const initialValues: ContactFormValues = {
    name: '',
    email: '',
    message: '',
  };

  const validate = (values: ContactFormValues) => {
    const result = contactSchema.safeParse(values);
    if (result.success) return {}; // No errors
    const formErrors: Record<string, string> = {};
    result.error.errors.forEach(err => {
      if (err.path[0]) {
        formErrors[err.path[0]] = err.message;
      }
    });
    return formErrors;
  };

  const handleSubmit = (values: ContactFormValues, actions: any) => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <Box mb={2}>
            <Field name="name" label="Name" component={TextInput} />
          </Box>
          <Box mb={2}>
            <Field name="email" label="Email" component={TextInput} />
          </Box>
          <Box mb={2}>
            <Field
              name="message"
              label="Message"
              component={TextInput}
              multiline
              rows={4}
            />
          </Box>
          <SubmitButton>Submit</SubmitButton>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
*/

import React from 'react';
import { Formik, Form, Field } from 'formik';
import { contactSchema, ContactFormValues } from '../validationSchema';
import TextInput from './TextInput';
import SubmitButton from './SubmitButton';
import { Box } from '@mui/material';
import FormikDebugPanel from './FormikDebugPanel'; // 👈 Import it

const ContactForm: React.FC = () => {
  const initialValues: ContactFormValues = {
    name: '',
    email: '',
    message: '',
  };

  const validate = (values: ContactFormValues) => {
    const result = contactSchema.safeParse(values);
    if (result.success) return {};
    const formErrors: Record<string, string> = {};
    result.error.errors.forEach((err) => {
      if (err.path[0]) {
        formErrors[err.path[0]] = err.message;
      }
    });
    return formErrors;
  };

  const handleSubmit = (values: ContactFormValues, actions: any) => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
      {(_formikProps: any) => (
        <>
          <Form>
            <Box mb={2}>
              <Field name="name" label="Name" component={TextInput} />
            </Box>
            <Box mb={2}>
              <Field name="email" label="Email" component={TextInput} />
            </Box>
            <Box mb={2}>
              <Field name="message" label="Message" component={TextInput} multiline rows={4} />
            </Box>
            <SubmitButton>Submit</SubmitButton>
          </Form>

          {/* debug panel */}
          {process.env.NODE_ENV === 'development' && <FormikDebugPanel />}
        </>
      )}
    </Formik>
  );
};

export default ContactForm;
