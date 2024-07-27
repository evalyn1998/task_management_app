import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Yup from "yup";
import "../css/register.css"
import { toast } from 'react-toastify';


const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is a required field").email("Invalid Email format"),
    password: Yup.string().required("Password is a required field").min(8,"Password must be of 8 characters"),
    confirmPassword: Yup.string()
        .required("Confirm Password is a required field")
        .oneOf([Yup.ref('password'), null], "Passwords must match")
});

const handleSubmit = async (values,{setSubmitting,setErrors})=> {
    try{
        const response = await axios.post("http://localhost:8000/createUser",{
            user_email:values.email,
            user_password:values.password
        });
        toast.success(response.data.message);
        setSubmitting(false);
    }
    catch(error){
        console.error("Error in submitting form", error);
        if(error.response && error.response.data){
            setErrors({general:error.response.data.message});
            toast.error(error.response.data.message);
        }
    }
}

function Register() {
    return (
        <div className="register-container">
            <h1 className="register-title">Register</h1>
            <Formik
                initialValues={{email: "", password: "",confirmPassword:"" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                 {({ errors, touched }) => (
                    <Form className="register-form">
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

                        <div className="form-group">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                            <Field
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Confirm your password"
                                className="form-input"
                            />
                            <ErrorMessage name="confirmPassword" component="div" className="form-error" />
                        </div>

                        {errors.general && touched.general && (
                            <div className="form-error">{errors.general}</div>
                        )}

                        <button type="submit" className="form-button">Register</button>

                        <div className="login-link">
                            <p>Already have an account? <Link to="/">Login</Link></p>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Register;
