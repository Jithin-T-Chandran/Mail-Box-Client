import React, { Fragment, useRef, useState } from "react";
import { useHistory,Link } from "react-router-dom";
import Swal from "sweetalert2";

function ForgotPassword() {
    const [isLoading, setLoading] = useState(false);
    const inputEmailRef = useRef();
    const history = useHistory();
    const changePasswordHandler = async (event) => {
        event.preventDefault();
        const enteredEmail = inputEmailRef.current.value;
    
        setLoading(true);
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyABUNZZiju-nmvQpHeN2g6NN2Yi-Yqdjww",
            {
              method: "POST",
              body: JSON.stringify({
                requestType: "PASSWORD_RESET",
                email: enteredEmail,
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
            Swal.fire({
              title: `Successfully sent the link to ${enteredEmail}`,
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            });
            history.replace("/");
          } else {
            const data = await response.json();
            alert(data.error.message);
          }
          setLoading(false);
        } catch (err) {
          console.log("Something went wrong");
          console.log(err);
          setLoading(false);
        }
      };
      const navigateToHandler = (event) => {
        event.preventDefault();
        history.replace("/");
      };
  return (
    <Fragment>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={changePasswordHandler}>
              <h3>Forgot Password</h3>
              <div className="mb-3">
                <label>Enter Your Registered Mail Id</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  ref={inputEmailRef}
                  required
                />
              </div>
              <div className="d-grid">
               <button type="submit" className="btn btn-primary">
               {!isLoading ? 'Submit' : 'Sending request...'}
               </button>
             </div>
               <p className="forgot-password text-right">
                  <Link className="nav-link" to={"/"}>Login?</Link>
               </p>

            </form>
          </div>
        </div>
    </Fragment>
  )
}

export default ForgotPassword

