import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import Toolbar from "../../components/Toolbar";
import {useContext} from "react";
import {ChatContext} from "../../context/ChatContext";
import MessageDefaultPage from "../../components/MessageDefaultPage";

const Home = () => {
    const { currentFriend } = useContext(ChatContext)
    return (
        <div className='home'>
            <div className="container">
                <Toolbar/>
                <Sidebar/>
                {Object.keys(currentFriend).length?<Chat/>:<MessageDefaultPage/>}
            </div>
        </div>
    )
}

export default Home