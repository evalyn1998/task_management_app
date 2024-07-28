import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import '../css/login.css';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is a required field').email('Invalid Email format'),
  password: Yup.string().required('Password is a required field')
});

const handleSubmit = async (values, { setSubmitting, setErrors }, login, navigate) => {
  try {
    const response = await axios.post('http://localhost:8000/authenticateUser', {
      user_email: values.email,
      user_password: values.password
    });
    toast.success(response.data.message);
    localStorage.setItem('user', response.data.token);
    login();
    navigate('/kanban');
  } catch (error) {
    console.error('Error in submitting form', error);
    if (error.response && error.response.data) {
      setErrors({ general: error.response.data.message });
      toast.error(error.response.data.error);
    }
  } finally {
    setSubmitting(false);
  }
};

function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers, login, navigate)}
      >
        {({ errors }) => (
          <Form className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email:</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="form-input"
              />
              <ErrorMessage name="email" component="div" className="form-error" />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="form-input"
              />
              <ErrorMessage name="password" component="div" className="form-error" />
            </div>

            {errors.general && (
              <div className="form-error">{errors.general}</div>
            )}

            <button type="submit" className="form-button">Login</button>

            <div className="register-link">
              <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
