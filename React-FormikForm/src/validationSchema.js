// validationSchema.js
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  message: yup
    .string()
    .required('Message is required')
    .min(10, 'Message must be at least 10 characters')
    .max(500, 'Message must be at most 500 characters'),
});

export default schema;
