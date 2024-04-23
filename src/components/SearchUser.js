import DefaultUserIcon from "../img/defaultUserIcon.png";
import {useState} from "react";
import {useWebSocket} from "../context/WebSocketContext";


const SearchUser = (props) => {
    const [disabled, setDisabled] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const { ws } = useWebSocket();
    const handleSend = (receiverId) => {

        if (disabled) return;

        const sendMsg = {
            "type": "friend_request",
            "sender_id": parseInt(localStorage.getItem("id")),
            "receiver_id": receiverId,
            "content": ""
        }
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(sendMsg));
            console.log('Send friend request success')
        } else {
            console.error('WebSocket not connected.');
        }

        setDisabled(true);


        const countdownTimer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);


        setTimeout(() => {
            clearInterval(countdownTimer);
            setDisabled(false);
            setCountdown(30);
        }, 30000);
    }

    return (
        <div className="users">

            {props.users?.map((user) => (
                <div className="userList"
                     key={user.cid.toString()}
                >
                    <img src={user.picture?process.env.REACT_APP_API_URL + "image/?image=" + user.picture: DefaultUserIcon} alt="" />
                    <div className="userInfo">
                        <div className="userName">
                            <span>{user.username}</span>
                            <p>{user.email}</p>
                        </div>
                        <div className="send">
                            {user.is_friend ? <p>Friends Already!</p> :
                                disabled ? <p>Request Sent ..... Send again after {countdown} s</p> :
                                <button onClick={() => handleSend(user.cid)}>
                                    Add
                                </button>}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

}
export default SearchUser