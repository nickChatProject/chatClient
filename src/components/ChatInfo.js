import More from "../img/more.png";
import Notification from "../img/notify.png";
import {useContext} from "react";
import {ChatContext} from "../context/ChatContext";
import axios from "axios";
import {useWebSocket} from "../context/WebSocketContext";

const ChatInfo = () => {
    const {currentFriend, setPopupOpen, isPopupOpen, setNotices} = useContext(ChatContext)
    const {isReceivedFriendRequest, setIsReceivedFriendRequest} = useWebSocket();
        const popNoticeWindow = () => {
            setIsReceivedFriendRequest([])
            const url = process.env.REACT_APP_API_URL + "friend_request/"
            axios.get(url, {
                headers:{"Authorization": localStorage.getItem("token")}
            }).then(res => {
                setNotices(res.data)
                console.log(res.data)
            }).catch(err=> {
                    console.error('Error fetching data:', err);
            })
            console.log('pop window')
            setPopupOpen(!isPopupOpen)
        }
        return (
            <div className="chatInfo">
                {currentFriend ?<span>{currentFriend.name}</span>:<span></span>}
                <div className="chatIcons">
                    <img src={More} alt="" onClick={() => popNoticeWindow()}/>
                </div>
                <div className="notify">
                    {isReceivedFriendRequest.length === 0 ? <div></div>:<img src={Notification} alt=""/>}
                </div>
            </div>
        )

}
export default ChatInfo