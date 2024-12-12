import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function Registration() {

  const [showSuccess, setShowSuccess] = useState(false); // State to control success modal
  const navigate = useNavigate(); // To navigate to other pages


  const initialValues = {
    username: "",
    password: "",
  };

  // Yup is used for any validation for the inputs etc. 
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });

  //call for creating new user
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      setShowSuccess(true); // Show success modal
    });

  }


  return (
    <div className='createPostPage'>
      {!showSuccess ? (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">

            <label>Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              id="inputCreatePost"
              name="username"
            />

            <label>Password: </label>
            <ErrorMessage name="password" component="span" />
            <Field
              id="inputCreatePost"
              type="password"
              name="password"
            />

            <button type="submit">Register</button>
          </Form>
        </Formik>
      ) : (
        // Modal after Registration
        <div className="successModal">
          <h2>User was successfuly register</h2>
          <button onClick={() => navigate("/")}>Home Page</button>
          <button onClick={() => navigate("/createpost")}>Create Post</button>
        </div>
      )}
    </div>
  )
}

export default Registration
