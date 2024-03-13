import React from "react";
import { Button, Form, Card } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../auth/Auth";
import useNavigateTo from "../routes/UseNavigateTo";

const SignupForm = () => {
  const { signup } = useAuth();
  const navigateTo = useNavigateTo();

  const validate = Yup.object({
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Name is Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is Required"),
    password: Yup.string()
      .min(8, "Must be 8 characters or more")
      .required("Password is Required")
      .matches(/[a-zA-Z]/, "Must contain at least one letter")
      .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one special character")
      .matches(/\d/, "Must contain at least one number"),
  });

  return (
    <div className="container">
      <h1 className="text-center mb-4">Sign Up</h1>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validate}
        onSubmit={(values) => {
          signup(values, navigateTo)
        }}
      >
        {({ handleSubmit, values, handleChange, isSubmitting }) => (
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                  <Form.Label>Name</Form.Label>
                  <Form.Control name="name" type="text" placeholder="Name" value={values.name} onChange={handleChange} />
                  <ErrorMessage name="name" />
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Label>Email</Form.Label>
                  <Form.Control name="email" type="email" placeholder="Email" value={values.email} onChange={handleChange} />
                  <ErrorMessage name="email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange} />
                  <ErrorMessage name="password" />
                </Form.Group>
                <Button disabled={isSubmitting} variant="primary" type="submit">Sign Up</Button>
              </Form>
            </Card.Body>
          </Card>
          
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;