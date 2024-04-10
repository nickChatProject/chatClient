import React, {useContext} from "react";
import Add from "../img/add.png";
import MsgIcon from "../img/msgIcon.png"
import Logout from "../img/logout.png"
import {useNavigate} from "react-router-dom";
import {ChatContext} from "../context/ChatContext";


const Toolbar = () => {
    const { setCurrentComponent } = useContext(ChatContext)
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("id")
        localStorage.removeItem("token")
        localStorage.removeItem("picture")
        navigate('login')
    }
    return (
        <div className="toolbar">
            <div className="avatar">
                <img src="https://images.pexels.com/photos/20230627/pexels-photo-20230627.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=""/>
            </div>
            <div className="toolIcons">
                <img src={MsgIcon} alt="" onClick={()=> setCurrentComponent('sidebar')}/>
                <img src={Add} alt="" onClick={()=> setCurrentComponent('search')}/>
            </div>
            <div className="logout">
                <img src={Logout} alt="" onClick={(event) => handleLogout()}/>
            </div>
        </div>
    )
}
export default Toolbar