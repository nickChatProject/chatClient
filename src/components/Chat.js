import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input"
import {useContext, useState} from "react";
import {ChatContext} from "../context/ChatContext";



const Chat = () => {
    const { currentFriend } = useContext(ChatContext)
    const [messages, setMessages] = useState([])
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{currentFriend.name}</span>
                <div className="chatIcons">
                    <img src={More} alt=""/>
                </div>
            </div>
            <Messages messages={messages} setMessages={setMessages}/>
            <Input messages={messages} setMessages={setMessages}/>
        </div>

    )
}
export default Chat