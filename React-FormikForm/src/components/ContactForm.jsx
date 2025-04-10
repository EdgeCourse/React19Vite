// components/ContactForm.jsx
import React from 'react';
import { Formik, Form, Field } from 'formik';
import TextInput from './TextInput';
import SubmitButton from './SubmitButton';
import schema from '../validationSchema';
import { Box } from '@mui/material';

const ContactForm = () => {
  const initialValues = { name: '', email: '', message: '' };

  const handleSubmit = (values, actions) => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {(formProps) => (
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
