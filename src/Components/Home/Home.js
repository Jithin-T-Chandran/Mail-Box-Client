import React,{useState,Fragment} from 'react'
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { mailActions } from '../../store/mailSlice';
import { getUsername } from '../../helper';
import JoditEditor from 'jodit-react';
import "./Home.css";

function Home() {
    const to = useRef();
    const subject = useRef();
    const message = useRef();
    let [content, setContent] = useState("");

    const dispatch = useDispatch();

    const user = localStorage.getItem("email");
    const username = getUsername(user);



    const submitHandler = (e) => {
        e.preventDefault();
        const enteredto = to.current.value;
        const enteredSubject = subject.current.value;
        const enteredmessage = content;
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
            console.log(email);
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
            <Fragment>
      <div className="home">
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
                        <form cla onSubmit={submitHandler}>
                            <div className="form-group">
                                <label htmlFor="email">To:</label>
                                <input type="email" name="email" id="email" placeholder="Enter receiver's email" ref={to} className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Subject">Subject:</label>
                                <input type="text" name="Subject" id="Subject" ref={subject} placeholder="Enter subject" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="Message">Message:</label>
                                {/* <textarea type="text" name="Message" id="Message" ref={message} /> */}
                                <JoditEditor className="textWidth" ref={message} value={content} onChange={(content) =>setContent(content)} />
                            </div>
                                <button className="btn btn-primary">Send Email</button>
                                <br/>
                            </form>
                </div>
            </div>
        </div>
            </Fragment>


    //   <div className="home">
    //         <div className="container">
    //             <div className="side_menu">
    //                 <ul>
    //                     <li>
    //                         <NavLink to="/home" activeClassName="active_link">Compose</NavLink>
    //                     </li>
    //                     <li><NavLink to="/inbox" activeClassName="active_link">Inbox</NavLink></li>
    //                     <li><NavLink to="/sent" activeClassName="active_link">Sent</NavLink></li>
    //                 </ul>
    //             </div>
    //             <div className="main_menu">
    //                     <form cla onSubmit={submitHandler}>
    //                         <div className="form-group">
    //                             <label htmlFor="email">To:</label>
    //                             <input type="email" name="email" id="email" placeholder="Enter receiver's email" ref={to} className="form-control"/>
    //                         </div>
    //                         <div className="form-group">
    //                             <label htmlFor="Subject">Subject:</label>
    //                             <input type="text" name="Subject" id="Subject" ref={subject} placeholder="Enter subject" className="form-control"/>
    //                         </div>
    //                         <div className="form-group">
    //                             <label htmlFor="Message">Message:</label>
    //                             {/* <textarea type="text" name="Message" id="Message" ref={message} /> */}
    //                             <JoditEditor className="textWidth" ref={message} value={content} onChange={(content) =>setContent(content)} />
    //                         </div>
    //                             <button className="btn btn-primary">Send Email</button>
    //                             <br/>
    //                         </form>
    //             </div>
    //         </div>
    //     </div>
  );
}

export default Home