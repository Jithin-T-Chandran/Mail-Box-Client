import React, { useEffect, useRef, useState,Fragment } from "react";
import { Alert } from "react-bootstrap";
import {  Link,useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { login } from "../../store/auth";

function SignUp() {
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ error: false, msg: "" });
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    checkUser();
  }, []);
  const checkUser = () => {
    const token_id = localStorage.getItem("Token");
    if (token_id !== null) {
      AuthenticateAndRedirect({ idToken: token_id });
      history.replace("/expense");
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredEmail = inputEmailRef.current.value;
    const enteredPassword = inputPasswordRef.current.value;
    if (enteredEmail === "" || enteredPassword === "") {
      setMessage({ error: true, msg: "All fields are mandatory!" });
      return;
    }

    setIsLoading(true);
    if (inputPasswordRef.current.value === confirmPasswordRef.current.value) {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyABUNZZiju-nmvQpHeN2g6NN2Yi-Yqdjww",
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          console.log("User has successfully signed up.");
          inputEmailRef.current.value = "";
          inputPasswordRef.current.value = "";
          confirmPasswordRef.current.value = "";
          setIsLoading(false);
          Swal.fire({
            title: "User Successfulluy Signup",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
          history.replace("/login");
        } else {
          const data = await response.json();
          alert(data.error.message);
        }
      } catch (err) {
        console.log(err);
        setMessage({ error: true, msg: err.message });
      }
    } else {
      alert("Passwords do NOT match");
    }
  };
  const AuthenticateAndRedirect = (data) => {
    dispatch(login(data.idToken));
    history.replace("/dashboard");
  };
  return (
    <div className="auth-wrapper">
     <div className="auth-inner">
      <form onSubmit={submitHandler}>
         <h3>Sign Up</h3>
         {message?.msg && (
          <Alert
            variant={message?.error ? "danger" : "success"}
            dismissible
            onClose={() => setMessage("")}
          >
            {message?.msg}
          </Alert>
        )}
          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              ref={inputEmailRef}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              minLength="6"
              maxLength="16"
              ref={inputPasswordRef}
              required
            />
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              minLength="6"
              maxLength="16"
              ref={confirmPasswordRef}
              required
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
            {!isLoading ? 'Sign up' : 'Sending request...'}
            </button>
          </div>
          <p className="forgot-password text-right">
            <Link className="nav-link" to={"/"}>
              Already have an account? Login
            </Link>
          </p>
      </form>
     </div>
    </div>
  );
}

export default SignUp;