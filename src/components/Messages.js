import Message from "./Message";
import {useContext, useEffect} from "react";
import {ChatContext} from "../context/ChatContext";
import axios from "axios";
import {useWebSocket} from "../context/WebSocketContext";

const Messages = () => {
    //const [messages, setMessages] = useState([]);
    const { isReceivedMessage } = useWebSocket();
    const { currentFriend, messages, setMessages } = useContext(ChatContext);

    useEffect(() => {
        const url = process.env.REACT_APP_API_URL + "chat_history/"
        const friendID = {
            "receiver_id": currentFriend.id
        }
        axios.post(url, friendID, {
            headers:{"Authorization": localStorage.getItem("token")}
        }).then(res=> {
            setMessages(res.data)
        }).catch(err=> {
            console.error('Error fetching data:', err);
        })


    }, [currentFriend.id, isReceivedMessage]);



    console.log(isReceivedMessage)

    return (
        <div className="messages">
            {messages.map((m) => (
                <Message message={m} key={m.id} />
            ))}
        </div>
    );
}

export default Messages