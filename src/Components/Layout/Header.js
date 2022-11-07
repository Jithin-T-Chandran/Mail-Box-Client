import {React, Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/auth";


function Header() {
    const dispatch = useDispatch();
    const history = useHistory();
    const isLoggedIn = useSelector((state) => state.user.isAuthenticated);


    const logoutHandler = (event) => {
        event.preventDefault();
        localStorage.removeItem("Token");
        localStorage.removeItem("userID");
        localStorage.removeItem("email");
        dispatch(logout());
        history.replace("/login");
    }
  return (
    <Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
            <NavLink className="navbar-brand" to={'/home'}>
                <img
                        alt=""
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoyP_HHeuMZFKkStveUA8XNhvZWe6FBippUJHfClfhrmi11xsVkNPrcNEAcGcJvacVQVE&usqp=CAU"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />
                &nbsp;Mail Box Client
            </NavLink>
            <div className="d-flex align-items-center" id="navbarTogglerDemo02">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">{isLoggedIn &&<NavLink className="nav-link"  to="/home">Home</NavLink>}</li>
                    <li className="nav-item">
                        {!isLoggedIn &&  <NavLink className="nav-link" activeClassName="active-item" to="/signup">Signup</NavLink>}
                    </li>
                     <li className="nav-item">
                        {!isLoggedIn &&  <NavLink className="nav-link" activeClassName="active-item" to="/login">Login</NavLink>}
                    </li>
                    <li className="nav-item">
                        {isLoggedIn &&<div className="nav-link pointerMouse" onClick={logoutHandler}  >Logout</div>}
                    </li>
                </ul>
            </div>
            </div>
        </nav>
    </Fragment>
  )
}

export default Header