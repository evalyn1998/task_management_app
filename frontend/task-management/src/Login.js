import React from 'react'
import {Formik,Form,Field,ErrorMessage} from "formik";
import "./css/login.css";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is a required field").email("Invalid Email format"),
    password: Yup.string().required("Password is a required field")
});

const handleSubmit = (values)=>{
    console.log('Form data:',values);
}

function LoginForm() {
    return (
        <div className="login-container">
        <h1 className="login-title">Login</h1>
        <Formik
          initialValues={{email:"", password:""}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
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
  
            <button type="submit" className="form-button">Login</button>
          </Form>
        </Formik>
      </div>
    );
  }
  
  export default LoginForm;