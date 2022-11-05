import { React , Fragment } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineDelete, AiOutlineStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { mailActions } from '../../store/mailSlice';
import "./Mail.css";

function Mail(props) {
    const dispatch = useDispatch();
    const openHandler = (key) => {
        fetch(`https://mail-box-client-c36e3-default-rtdb.firebaseio.com/${props.mail.receiver}/receiver/${key}.json`, {
            method: "PUT",
            body: JSON.stringify({
                receiver: props.mail.receiver,
                subject: props.mail.subject,
                message: props.mail.message,
                sender: props.mail.sender,
                isOpen: true
            })
        }).then((res) => {
            dispatch(mailActions.openMail(props.mail.key));
        })
    }
    const deleteHandler = () => {
        props.deleteItem(props.mail.key);
    }
  return (
    <Fragment>
        <div className="inbox_mail">
            <span onClick={deleteHandler} className="delete_handler"><AiOutlineDelete /></span>
            <span><AiOutlineStar /></span>
            {!props.mail.isOpen && props.isSentBox === false && <span className="dot"></span>}
            {props.isSentBox === false && <NavLink state={props.mail} to={`/inbox/${props.mail.key}`} onClick={openHandler.bind(null, props.mail.key)}>
                <p>{props.mail.subject}</p>
            </NavLink>}
            {props.isSentBox === true && <NavLink state={props.mail} to={`/sent/${props.mail.key}`}>
                <p>{props.mail.subject}</p>
            </NavLink>}
        </div>
    </Fragment>
  )
}

export default Mail