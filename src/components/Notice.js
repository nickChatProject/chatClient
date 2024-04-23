import {useContext, useState} from "react";
import DefaultUserIcon from "../img/defaultUserIcon.png";
import axios from "axios";
import {useWebSocket} from "../context/WebSocketContext";
import {ChatContext} from "../context/ChatContext";

const Notice = ({notice}) => {
    const [isAccepted, setIsAccepted] = useState(false)
    const [isReplied, setIsReplied] = useState(false)
    const { ws } = useWebSocket();
    const { friends, setFriends} = useContext(ChatContext)

    const sendWebSocket = (message) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
            const friend = [
                notice.from_id,
                notice.from_name,
                notice.from_picture,
                "",
                "",
                "",
                ""
            ]
            setFriends([
                ...friends,
                friend
            ]);
            return true
        } else {
            console.error('WebSocket not connected.');
            return false
        }
    }

    const handleAccept = () => {
        setIsReplied(true)
        setIsAccepted(true)
        const url = process.env.REACT_APP_API_URL + "friend_request/"
        const friendId = {
            "cid": notice.from_id
        }
        axios.put(url, friendId,{
            headers:{"Authorization": localStorage.getItem("token")}
        }).then (
            res => {
                console.log(res.data)
        }).catch(err=> {
            console.error('Error fetching data:', err);
        })
        const message = {
            "type": "friend_accept",
            "sender_id": parseInt(localStorage.getItem("id")),
            "receiver_id": notice.from_id,
            "content": ""
        }
        const isSuccess = sendWebSocket(message)
        console.log("friend add success:")
        console.log(isSuccess)
        //setIsResponse(notice.from_id)

    }
    const handleRefuse = () => {
        setIsReplied(true)
        const url = process.env.REACT_APP_API_URL + "friend_request/"
        const friendId = {
            "cid": notice.from_id
        }
        axios.delete(url,{
            headers:{"Authorization": localStorage.getItem("token")},
            data: friendId
        }).then (
            res => {
                console.log(res.data)
            }).catch(err=> {
            console.error('Error fetching data:', err);
        })

    }
    return (
        <div className="notice">
            <div className="userInfo">
                <img src={notice.from_picture ? process.env.REACT_APP_API_URL + "image/?image=" + notice.from_picture : DefaultUserIcon}
                     alt=""/>
                <p>{notice.from_name}</p>
            </div>
            {isReplied ? isAccepted ? <p style={{color: "green"}}>Accepted!</p> : <p style={{color: "red"}}>Refused!</p>: <div>
                <button onClick={handleAccept}>Accept</button>
                <button onClick={handleRefuse}>Refuse</button>
            </div>}
        </div>
    )
}
export default Notice