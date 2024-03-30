import DefaultUserIcon from "../img/defaultUserIcon.png"
import {useContext, useEffect} from "react";
import axios from "axios";
import {ChatContext} from "../context/ChatContext";
import {useWebSocket} from "../context/WebSocketContext";
const Chats = () => {
    //const [friends, setFriends] = useState([]);
    const uid = localStorage.getItem("id")
    const { isReceivedMessage } = useWebSocket()
    const { getFriendInfo, currentFriend, friends, setFriends} = useContext(ChatContext)
    useEffect(() => {
        const getChats = () => {

            const url = process.env.REACT_APP_API_URL + "friends/"
            const unsub = axios.get(url, {
                headers:{"Authorization": localStorage.getItem("token")}
            }).then(
                res=> setFriends(res.data.friends)
            ).catch(err => {
                console.error('Error fetching data:', err);
            })

            return () => {
                unsub();
            };
        };

        uid && getChats();
    }, [uid, isReceivedMessage]);
    const handleSelect = (array) => {

        getFriendInfo(array)
        console.log(currentFriend)
    }
    return (
        <div className="chats">
            {friends?.map((friend) => (
                <div className="userChat"
                     key={friend[0].toString()}
                     onClick={() => handleSelect(friend.slice(0, 3))}
                >
                    <img src={friend[2]?process.env.REACT_APP_API_URL + "image/?image=" + friend[2]: DefaultUserIcon} alt="" />
                    <div className="userChatInfo">
                        <span>{friend[1]}</span>
                        <p>{friend[3].length > 20? friend[3].slice(0, 20) + "...": friend[3]}</p>
                    </div>
                </div>
            ))}
        </div>

    );

}

export default Chats