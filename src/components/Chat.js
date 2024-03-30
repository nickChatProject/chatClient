import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input"
import {useContext} from "react";
import {ChatContext} from "../context/ChatContext";



const Chat = () => {
    const { currentFriend } = useContext(ChatContext)
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{currentFriend.name}</span>
                <div className="chatIcons">
                    <img src={More} alt=""/>
                </div>
            </div>
            <Messages />
            <Input />
        </div>

    )
}
export default Chat