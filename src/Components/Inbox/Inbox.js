import React, { useState, useEffect,Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { mailActions } from '../../store/mailSlice';
import { getUsername } from '../../helper';
import Mail from '../Mail/Mail';
import SyncLoader from "react-spinners/SyncLoader";
import "./Inbox.css";

function Inbox() {
    const [inboxMail, setInboxMail] = useState([]);
    const user = localStorage.getItem("email");
    const username = getUsername(user);
    const dispatch = useDispatch();
    const totalNotOpened = useSelector(state => state.mail.totalNotOpened);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2300);
    }, []);
    useEffect(() => {
        console.log("called");
        const setIntervalId = setInterval(() => {
            let mails = [];
            fetch(`https://mail-box-client-c36e3-default-rtdb.firebaseio.com/${username}/receiver.json`).then((res) => {
                return res.json();
            }).then((data) => {
                let notOpened = 0;
                for (let [key, value] of Object.entries(data)) {
                    mails.push({ key, ...value });
                    if (value.isOpen === false) {
                        notOpened += 1;
                    }
                }
                setInboxMail(mails);
                dispatch(mailActions.countNotOpened(notOpened));
            }).catch((err) => {
                console.log(err);
            });
        }, 2000);
        return () => clearInterval(setIntervalId);
    }, [dispatch]);
    const deleteHandler = (key) => {
        fetch(`https://mail-box-client-c36e3-default-rtdb.firebaseio.com/${username}/receiver/${key}.json`, {
            method: "DELETE",
        }).then((res) => {
            const inboxMailCopy = [...inboxMail]
            const index = inboxMailCopy.findIndex((item) => item.key === key);
            inboxMailCopy.splice(index, 1)
            setInboxMail(inboxMailCopy);
        })
    }
  return (
    <Fragment>
              {loading ? (
        <div className="spinner topRatio" >
          <SyncLoader color={"#33bbff"} loading={loading} size={30} />
        </div>
      ) : (
        <>

            <div className="home">
                <div className="container">
                    <div className="side_menu">
                        <ul>
                            <li className="active">
                                <NavLink to="/home" activeClassName="active_link">Compose</NavLink>
                            </li>
                            <li><NavLink to="/inbox" activeClassName="active_link">Inbox <span className="not-opened">{totalNotOpened} Unread</span></NavLink></li>
                            <li><NavLink to="/sent" activeClassName="active_link">Sent</NavLink></li>
                        </ul>
                    </div>
                    <div className="inbox_menu">
                        {inboxMail.map((mail) => {
                            return <Mail key={mail.key} deleteItem={deleteHandler} mail={mail} isSentBox={false} />
                        })}
                    </div>
                </div>
            </div >
            </>
                  )}
    </Fragment>
);
}

export default Inbox