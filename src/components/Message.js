import {useContext, useEffect, useRef} from "react";
import {ChatContext} from "../context/ChatContext";
import DefaultUserIcon from "../img/defaultUserIcon.png";


const Message = ({ message }) => {
    const { currentFriend } = useContext(ChatContext);
    const ownerMsg = "message"
    const friendMsg = "message owner"

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div
            ref={ref}
            className={message.sender_id.toString() === localStorage.getItem("id")? ownerMsg: friendMsg}
        >
            <div className="messageInfo">
                <img
                    src={
                        message.sender_id.toString() === localStorage.getItem("id")?
                            localStorage.getItem("picture")?process.env.REACT_APP_API_URL + "image/?image=" + localStorage.getItem("picture"): DefaultUserIcon:
                            currentFriend.picture?process.env.REACT_APP_API_URL + "image/?image=" + currentFriend.picture: DefaultUserIcon
                    }
                    alt=""
                />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>{message.content}</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    );
};

export default Message;