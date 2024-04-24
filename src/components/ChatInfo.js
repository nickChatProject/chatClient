import More from "../img/more.png";
import Notification from "../img/notify.png";
import {useContext} from "react";
import {ChatContext} from "../context/ChatContext";
import axios from "axios";
import {useWebSocket} from "../context/WebSocketContext";
import {useNavigate} from "react-router-dom";

const ChatInfo = () => {
    const {currentFriend, setPopupOpen, isPopupOpen, setNotices, handleTokenExpire} = useContext(ChatContext)
    const {isReceivedFriendRequest, setIsReceivedFriendRequest} = useWebSocket();
    const navigate = useNavigate();
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
                const isConfirm = handleTokenExpire(err.response.data.error_msg)
                if (isConfirm) {
                    navigate('login')
                }
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