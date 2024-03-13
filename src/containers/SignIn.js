import React from 'react';
import { Button, Form, Card } from "react-bootstrap";
import { Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';

const SignInForm = () => {

    const handleOnSubmit = async (values, actions) => {
        // try {
        //   const response = await axios({
        //     method: "POST",
        //     url: "http://localhost:5000/api/users/login",
        //     data: values,
        //   });
        //   actions.setSubmitting(false);
        //   actions.resetForm();
        //   login(response.data.token);
        // } catch (error) {
        //   actions.setSubmitting(false);
        //   // display error message
        // }
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is Required'),
        password: Yup.string().required('Password is Required')
    });

    return (
        <div className="container">
            <h1 className="text-center mb-4">Sign In</h1>
            <Formik
                initialValues={{ name: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleOnSubmit}
            >
                {({ isSubmitting, values, handleChange, handleSubmit }) => (
                    <Card>
                        <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control name="name" type="text" placeholder="Name" value={values.name} onChange={handleChange} />
                                <ErrorMessage name="name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control name="password" type="password" placeholder="Password" value={values.password} onChange={handleChange} />
                                <ErrorMessage name="password" />
                            </Form.Group>
                            <Button disabled={isSubmitting} variant="primary" type="submit">Sign In</Button>
                        </Form>
                        </Card.Body>
                    </Card>
                    
                )}
            </Formik>
        </div>
    );
};

export default SignInForm;