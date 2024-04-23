import Messages from "./Messages";
import Input from "./Input"
import ChatInfo from "./ChatInfo";


const Chat = () => {

    return (

        <div className="chat">
            {/*<div className="chatInfo">*/}
            {/*    <span>{currentFriend.name}</span>*/}
            {/*    <div className="chatIcons">*/}
            {/*        <img src={More} alt=""/>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <ChatInfo/>
            <Messages/>
            <Input/>
        </div>
    )
}
export default Chat