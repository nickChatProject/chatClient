import React, {useContext, useState} from "react";
import Add from "../img/add.png";
import MsgIcon from "../img/msgIcon.png"
import Logout from "../img/logout.png"
import {useNavigate} from "react-router-dom";
import {ChatContext} from "../context/ChatContext";
import DefaultUserIcon from "../img/defaultUserIcon.png";
import {v4 as uuidv4} from "uuid";
import axios from "axios";


const Toolbar = () => {
    const { setCurrentComponent } = useContext(ChatContext)
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null)
    const handleLogout = () => {
        localStorage.removeItem("id")
        localStorage.removeItem("token")
        localStorage.removeItem("picture")
        navigate('login')
    }
    const handleAvatar = (img) => {
        const file = img;
        const reader = new FileReader();
        reader.onload = () => {
            setAvatar(reader.result);
        };
        reader.readAsDataURL(file);
        setAvatar(img)
        const imgName = uuidv4() + "." +img.name.split(".")[1]
        const formData = new FormData();
        formData.append("files", file, imgName);
        const url = process.env.REACT_APP_API_URL + "avatar/"
        axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": localStorage.getItem("token")
            },
        }).then((response) => {
            // handle the response
            console.log("Upload success");
            localStorage.setItem("picture", imgName)
        }).catch((error) => {
            // handle errors
            console.log(error);
        });

    }
    return (
        <div className="toolbar">
            <div className="avatar">
                <input
                    type="file"
                    style={{display: "none"}}
                    id="file"
                    accept="image/png"
                    onChange={(e) => {
                        handleAvatar(e.target.files[0])
                    }}
                />
                <label htmlFor="file">
                    <img src={avatar?
                        avatar:
                        localStorage.getItem("picture")?
                            process.env.REACT_APP_API_URL + "image/?image=" + localStorage.getItem("picture"):
                            DefaultUserIcon} alt=""/>
                </label>
            </div>
            <div className="toolIcons">
                <img src={MsgIcon} alt="" onClick={() => setCurrentComponent('sidebar')}/>
                <img src={Add} alt="" onClick={() => setCurrentComponent('search')}/>
            </div>
            <div className="logout">
                <img src={Logout} alt="" onClick={(event) => handleLogout()}/>
            </div>
        </div>
    )
}
export default Toolbar