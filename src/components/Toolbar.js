import React from "react";
import Add from "../img/add.png";
import MsgIcon from "../img/msgIcon.png"
import Logout from "../img/logout.png"


const Toolbar = () => {
    return (
        <div className="toolbar">
            <div className="avatar">
                <img src="https://images.pexels.com/photos/20230627/pexels-photo-20230627.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load" alt=""/>
            </div>
            <div className="toolIcons">
                <img src={MsgIcon} alt=""/>
                <img src={Add} alt=""/>
            </div>
            <div className="logout">
                <img src={Logout} alt=""/>
            </div>
        </div>
    )
}
export default Toolbar