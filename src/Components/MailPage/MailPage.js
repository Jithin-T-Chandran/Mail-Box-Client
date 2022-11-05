import { React ,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router";
import { mailActions } from '../../store/mailSlice';
import { getUsername } from '../../helper';
import "./MailPage.css";

function MailPage(props) {
    const user = localStorage.getItem("email");
    const username = getUsername(user);
    const dispatch = useDispatch();
    const params = useParams();
    const mail = useSelector(state => state.mail.mail);
        useEffect(() => {
            if (props.isSentBoxMail === false) {
                fetch(`https://mail-box-client-c36e3-default-rtdb.firebaseio.com//${username}/receiver.json`).then((res) => {
                    return res.json();
                }).then((data) => {
                    let inboxMails = [];
                    for (let [key, value] of Object.entries(data)) {
                        inboxMails.push({ key, ...value });
                    }
                    const selectedMail = inboxMails.find((i) => i.key === params.id);
                    dispatch(mailActions.replaceMail(selectedMail));
                }).catch((err) => {
                    console.log(err);
                })
            }
            else {
                fetch(`https://mail-box-client-c36e3-default-rtdb.firebaseio.com//${username}/sent.json`).then((res) => {
                    return res.json();
                }).then((data) => {
                    let inboxMails = [];
                    for (let [key, value] of Object.entries(data)) {
                        inboxMails.push({ key, ...value });
                    }
                    const selectedMail = inboxMails.find((i) => i.key === params.id);
                    dispatch(mailActions.replaceMail(selectedMail));
                }).catch((err) => {
                    console.log(err);
                })
            }
        }, []);
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
                <div className="selected_mail">
                    <h5>From : {mail.sender}</h5>
                    <h4>Subject</h4>
                    <h3>{mail.subject}</h3>
                    <h4>Message</h4>
                    <p>{mail.message}</p>
                </div>
            </div>
        </div >
  );
}

export default MailPage