import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import Toolbar from "../../components/Toolbar";
import {useContext} from "react";
import {ChatContext} from "../../context/ChatContext";
import MessageDefaultPage from "../../components/MessageDefaultPage";
import Search from "../../components/Search";

const Home = () => {
    const { currentFriend, currentComponent } = useContext(ChatContext)
    const renderComponent = () => {
        switch (currentComponent) {
            case 'sidebar':
                return <Sidebar />;
            case 'search':
                return <Search />;
            default:
                return null;
        }
    };
    return (
        <div className='home'>
            <div className="container">
                <Toolbar/>
                {renderComponent()}
                {Object.keys(currentFriend).length?<Chat/>:<MessageDefaultPage/>}
            </div>
        </div>
    )
}

export default Home