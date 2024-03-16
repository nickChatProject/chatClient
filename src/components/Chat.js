import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input"



const Chat = () => {
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>John</span>
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