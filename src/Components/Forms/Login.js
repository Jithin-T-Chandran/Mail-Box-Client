import React, { useEffect, useRef, useState,Fragment } from "react";
import { Alert } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { login } from "../../store/auth";
function Login() {
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

useEffect(() => {
    checkUser();
  }, []);
  
  const checkUser = () => {
    const token_id = localStorage.getItem("Token");
    if (token_id !== null) {
      AuthenticateAndRedirect({ idToken: token_id });
      history.replace("/home");
    }
  };

  const submitHandler = async (event) => {
      event.preventDefault();
      const enteredEmail = inputEmailRef.current.value;
      const enteredPassword = inputPasswordRef.current.value;
      setIsLoading(true);
      try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyABUNZZiju-nmvQpHeN2g6NN2Yi-Yqdjww",
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
            const data = await response.json();
            console.log(data);
            console.log("User has successfully Logged in.");
            localStorage.setItem("Token", data.idToken);
            localStorage.setItem("userID", data.localId);
            localStorage.setItem("email", enteredEmail);
            inputEmailRef.current.value = "";
            inputPasswordRef.current.value = "";
            setIsLoading(false);
            AuthenticateAndRedirect(data);
            Swal.fire("Good job!", "You are successfully logged in", "success");
            setIsLoading(false);
          } else {
            const data = await response.json();
            setIsLoading(false);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data.error.message,
            })
          }
        } catch (err) {
          console.log("Logging Something went wrong!");
        }
  }
  const AuthenticateAndRedirect = (data) => {
    dispatch(login(data.idToken));
    history.replace("/home");
  };
  return (
    <Fragment>
      <div className="auth-wrapper">
        <div className="auth-inner">
        <form onSubmit={submitHandler}>
            <h3>Log In</h3>
            {error && <Alert variant="danger">{error}</Alert>}
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
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
              {!isLoading ? 'Login' : 'Sending request...'}
              </button>
            </div>
            <p className="forgot-password text-right">
              <Link className="nav-link" to={"/forgotpassword"}>
                Reset password?
              </Link>
            </p>
            <p className="forgot-password text-right">
            <Link className="nav-link" to={"/signup"}>
            Dont have an acount? SignUp
            </Link>
          </p>
        </form>
        
        </div>
      </div>
    </Fragment>
  );
}

export default Login;