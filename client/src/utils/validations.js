import * as yup from 'yup';

/**
 * Validation Schemas using Yup
 */

export const citizenRegisterSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  phone: yup.string().nullable(),
});

export const loginSchema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export const complaintSchema = yup.object({
  description: yup.string().required('Description is required').min(10, 'Description must be at least 10 characters'),
  location: yup.string().required('Location is required'),
  category: yup.string().nullable(),
  name: yup.string().nullable(),
  phone: yup.string().nullable(),
  anonymous: yup.boolean().default(false),
});

export const authorityUserSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  role: yup.string().required('Role is required'),
  department: yup.string().required('Department is required'),
});

