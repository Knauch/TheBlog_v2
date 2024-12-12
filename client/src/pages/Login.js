import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState({ success: false, error: false }); // State for modals
  const [errorMessage, setErrorMessage] = useState(""); // To store error message

  //to save auth context
  const { setAuthState } = useContext(AuthContext)

  const navigate = useNavigate(); // To navigate to other pages

  const login = () => {
    const data = { username, password };
    axios
      .post("http://localhost:3001/auth/login", data)
      .then((response) => {

       

        if (response.data) {
          // If success message is present
          localStorage.setItem("accessToken", response.data)
          
          setAuthState(true)
          setShowModal({ success: true, error: false });
        } else if (response.data.error) {

          alert(response.data.error)
          // If error is present in the response
          setErrorMessage(response.data.error);
          setShowModal({ success: false, error: true });
        }
      })
      .catch(() => {
        // Handle unexpected errors
        setErrorMessage("An unexpected error occurred. Please try again.");
        setShowModal({ success: false, error: true });
      });
  };

  return (
    <div className="loginContainer">
      {!showModal.success && !showModal.error ? (
        <>
          <label>Username:</label>
          <input
            type="text"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <label>Password:</label>
          <input
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />

          <button onClick={login}>Login</button>
        </>
      ) : showModal.success ? (
        // Success Modal
        <div className="successModal">
          <h2>Login was successfull</h2>
          <button onClick={() => navigate("/")}>Home Page</button>
          <button onClick={() => navigate("/createpost")}>Create Post</button>
        </div>
      ) : (
        // Error Modal
        <div className="errorModal">
          <h2>{errorMessage}</h2>
          <button onClick={() => setShowModal({ success: false, error: false })}>
            Retry Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Login;