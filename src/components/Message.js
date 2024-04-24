import {useContext, useEffect, useRef} from "react";
import {ChatContext} from "../context/ChatContext";
import DefaultUserIcon from "../img/defaultUserIcon.png";
import FileWhite from "../img/file.png";
import FileBlack from "../img/file_black.png";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Message = ({ message }) => {
    const { currentFriend, handleTokenExpire } = useContext(ChatContext);
    const navigate = useNavigate();
    const ownerMsg = "message"
    const friendMsg = "message owner"

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const handleDownload = (object) => {
        const url = process.env.REACT_APP_API_URL + "file/?file=" + object.file_id
        console.log(process.env.REACT_APP_API_URL + "image/?image=" + currentFriend.picture)
        axios.get(url,
            {headers:{"Authorization": localStorage.getItem("token")},
                responseType: 'blob',
        }).then(res=> {
            const blob = new Blob([res.data], { type: res.headers['content-type'] });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = object.file_name
            link.click();
            document.body.removeChild(link);
        }).catch(err=> {
            console.log("download file fail", err)
            const isConfirm = handleTokenExpire(err.response.data.error_msg)
            if (isConfirm) {
                navigate('login')
            }
        })
    }
    return (
        <div
            ref={ref}
            className={message.sender_id.toString() === localStorage.getItem("id")? ownerMsg: friendMsg}
        >
            <div className="messageInfo">
                <img
                    src={
                        message.sender_id.toString() === localStorage.getItem("id")?
                            localStorage.getItem("picture")?process.env.REACT_APP_API_URL + "image/?image=" + localStorage.getItem("picture"): DefaultUserIcon:
                            currentFriend.picture?process.env.REACT_APP_API_URL + "image/?image=" + currentFriend.picture: DefaultUserIcon
                    }
                    alt=""
                />
                {/*<span>{message.created_at}</span>*/}
            </div>

            {message.type === "message" ?
                <div className="messageContent">
                    <p>{message.content}</p>
                </div> :
                <div className="fileContent">
                    <div>
                        {message.sender_id.toString() === localStorage.getItem("id") ?
                            <img src={FileBlack} alt=""
                                 onClick={(event) => handleDownload(JSON.parse(message.content))}/> :
                            <img src={FileWhite} alt=""
                                 onClick={(event) => handleDownload(JSON.parse(message.content))}/>
                        }
                        <p>{JSON.parse(message.content).file_name}</p>
                    </div>
                </div>

            }
            {/*<div className="messageContent">*/}
            {/*    {message.type === "message" && <p>{message.content}</p>}*/}

            {/*    {message.img && <img src={message.img} alt=""/>}*/}
            {/*</div>*/}
            {/*<div className="fileContent">*/}
            {/*    {message.type === "file" && <div>*/}
            {/*    <img src={File} alt="" onClick={(event) => handleDownload(JSON.parse(message.content).file_id)}/>*/}
            {/*        <p>{JSON.parse(message.content).file_name}</p>*/}
            {/*    </div>}*/}
            {/*</div>*/}
        </div>
    );
};

export default Message;