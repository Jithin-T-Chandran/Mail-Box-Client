import React from 'react'
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { mailActions } from '../../store/mailSlice';
import { getUsername } from '../../helper';
import "./Home.css";

function Home() {
    const to = useRef();
    const subject = useRef();
    const message = useRef();

    const dispatch = useDispatch();

    const user = localStorage.getItem("email");
    const username = getUsername(user);



    const submitHandler = (e) => {
        e.preventDefault();
        const enteredto = to.current.value;
        const enteredSubject = subject.current.value;
        const enteredmessage = message.current.value;
        const email = {
            receiver: enteredto,
            subject: enteredSubject,
            message: enteredmessage,
            sender: username,
            isOpen: false
        };
        fetch(`https://mail-box-client-c36e3-default-rtdb.firebaseio.com/${username}/sent.json`, {
            method: "POST",
            body: JSON.stringify(email)
        }).then((res) => {
            if (!res.ok) {
                throw new Error("Something went wrong!");
            }
            else return res.json();
        }).then((data) => {
            console.log("MESSAGE SENT");
        }).catch((err) => {
            console.error(err.message);
        });
        const userReceived = getUsername(enteredto);
        const received_mail = {
            receiver: userReceived,
            subject: enteredSubject,
            message: enteredmessage,
            sender: username,
            isOpen: false
        }
        fetch(`https://mail-box-client-c36e3-default-rtdb.firebaseio.com/${userReceived}/receiver.json`, {
            method: "POST",
            body: JSON.stringify(received_mail)
        }).then((res) => {
            if (!res.ok) { throw new Error("Something went wrong!") }
            else return res.json();
        }).then((data) => {
            dispatch(mailActions.addMail(received_mail));
        }).catch((err) => { console.log(err); });
    }



  return (
      <div className="home">
            <div className="menu_bar">
                <h3>Mailbox Client 📧</h3>
            </div>
            <div className="container">
                <div className="side_menu">
                    <ul>
                        <li>
                            <NavLink to="/home" activeClassName="active_link">Compose</NavLink>
                        </li>
                        <li><NavLink to="/inbox" activeClassName="active_link">Inbox</NavLink></li>
                        <li><NavLink to="/sent" activeClassName="active_link">Sent</NavLink></li>
                    </ul>
                </div>
                <div className="main_menu">
                    <form className="mailbox" onSubmit={submitHandler}>
                        <label htmlFor="email">To:</label>
                        <input type="email" name="email" id="email" placeholder="Enter receiver's email" ref={to} />
                        <label htmlFor="Subject">Subject:</label>
                        <input type="text" name="Subject" id="Subject" ref={subject} placeholder="Enter sender's email" />
                        <label htmlFor="Message">Message:</label>
                        <textarea type="text" name="Message" id="Message" ref={message} />
                        <button className="btn-auth">Send Email</button>
                    </form>
                </div>
            </div>
        </div>
  );
}

export default Home