import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getUsername } from '../helper';
import Mail from "./Mail/Mail";
import "./Inbox/Inbox.css";

function Sent() {
    const [inboxMail, setInboxMail] = useState([]);
    const user = localStorage.getItem("email");
    const username = getUsername(user);
    useEffect(() => {
        let mails = [];
        fetch(`https://mail-box-client-c36e3-default-rtdb.firebaseio.com/${username}/sent.json`).then((res) => {
            return res.json();
        }).then((data) => {
            for (let [key, value] of Object.entries(data)) {
                mails.push({ key, ...value });
            }
            setInboxMail(mails);
        }).catch((err) => {
            console.log(err);
        });
        console.log("getting called");
    }, []);
    const deleteHandler = (key) => {
        fetch(`https://mail-box-client-c36e3-default-rtdb.firebaseio.com/${username}/sent/${key}.json`, {
            method: "DELETE",
        }).then((res) => {
            const inboxMailCopy = [...inboxMail]
            const index = inboxMailCopy.findIndex((item) => item.key === key);
            inboxMailCopy.splice(index, 1)
            setInboxMail(inboxMailCopy);
        })
    }
  return (
    <div className="home">
        <div className="menu_bar">
            <h3>Mailbox Client</h3>
        </div>
        <div className="container">
            <div className="side_menu">
                <ul>
                    <li className="active">
                        <NavLink to="/home" activeClassName="active_link">Compose</NavLink>
                    </li>
                    <li><NavLink to="/inbox" activeClassName="active_link">Inbox</NavLink></li>
                    <li><NavLink to="/sent" activeClassName="active_link">Sent</NavLink></li>
                </ul>
            </div>
            <div className="inbox_menu">
                {inboxMail.map((mail) => {
                    return <Mail key={mail.key} mail={mail} deleteItem={deleteHandler} isSentBox={true} />
                })}
            </div>
        </div>
    </div >
);
}

export default Sent