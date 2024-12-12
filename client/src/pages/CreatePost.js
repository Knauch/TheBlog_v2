import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function CreatePost() {

  const [showSuccess, setShowSuccess] = useState(false); // State to control success modal
  const navigate = useNavigate(); // To navigate to other pages

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  // Yup is used for any validation for the inputs etc. 
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
    username: Yup.string().min(3).max(15).required(),
  });


  //Making post request to save our post to the database
  const onSubmit = (data, { resetForm }) => {
    axios.post("http://localhost:3001/posts", data).then((response) => {
      console.log("Post was created");
      setShowSuccess(true); // Show success modal
      resetForm(); // Reset form fields
    });
  };

  return (
    <div className='createPostPage'>
      {!showSuccess ? (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <label>Title: </label>
            <ErrorMessage name="title" component="span" />
            <Field
              id="inputCreatePost"
              name="title"
            />
            <label>Post: </label>
            <ErrorMessage name="postText" component="span" />
            <Field
              id="inputCreatePost"
              name="postText"
            />
            <label>Username: </label>
            <ErrorMessage name="username" component="span" />
            <Field
              id="inputCreatePost"
              name="username"
            />

            <button type="submit"> Create Post</button>
          </Form>
        </Formik>
      ) : (
        // Modal after submitting Post
        <div className="successModal">
          <h2>Your Post Was Successfully Created!</h2>
          <button onClick={() => navigate("/")}>Home Page</button>
          <button onClick={() => setShowSuccess(false)}>Create Another Post</button>
        </div>
      )}
    </div>
  )
}

export default CreatePost
