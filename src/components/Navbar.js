import Sidebar from "./Sidebar";
import Search from "./Search";
import {useContext} from "react";
import {ChatContext} from "../context/ChatContext";


const Navbar = () => {
    const { currentComponent } = useContext(ChatContext)
    const renderComponent = () => {
        switch (currentComponent) {
            case 'sidebar':
                return <span>Chats</span>;
            case 'search':
                return <span>Search</span>;
            default:
                return null;
        }
    }
    return (
        <div className='navbar'>

            <div className="chatsTitle">
                {renderComponent()}
            </div>
        </div>
    )
}

export default Navbar