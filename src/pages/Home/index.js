import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import Toolbar from "../../components/Toolbar";
import {useContext, useState} from "react";
import {ChatContext} from "../../context/ChatContext";
import MessageDefaultPage from "../../components/MessageDefaultPage";
import Search from "../../components/Search";
import Notice from "../../components/Notice";
import OrgSearch from "../../components/OrgSearch";

const Home = () => {
    const { currentFriend, currentComponent, isPopupOpen, notices, isClosed } = useContext(ChatContext)
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
        <div>
            {isClosed?null:<OrgSearch/>}

            {isPopupOpen && (
                <div className="notices">
                    <div className="title">
                        <p>Notification</p>
                    </div>
                    <div className="list">
                        {notices && notices.map((n) => (
                            <Notice notice={n} key={n.id}/>
                        ))}
                    </div>
                </div>
            )}
            <div className='home'>

                <div className="container">
                    <Toolbar/>
                    {renderComponent()}
                    {Object.keys(currentFriend).length?<Chat/>:<MessageDefaultPage/>}

                </div>
            </div>
        </div>
    )
}

export default Home