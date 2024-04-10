import Attach from "../img/attach.png";
import {useContext, useState} from "react";
import {ChatContext} from "../context/ChatContext";
import {useWebSocket} from "../context/WebSocketContext";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
const Input = () => {
    const [text, setText] = useState("");
    //const [file, setFile] = useState(null);
    const { currentFriend, messages, setMessages, friends, setFriends, file, setFile } = useContext(ChatContext);
    const { ws } = useWebSocket();

    const sendData = (type) => {
        return {
            "type": type,
            "sender_id": parseInt(localStorage.getItem("id")),
            "receiver_id": currentFriend.id,
            "content": ""
        }
    }

    const sendWebSocket = (message) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
            setMessages([
                ...messages,
                message
            ]);
            return true
        } else {
            console.error('WebSocket not connected.');
            return false
        }
    }

    const updateLastMessage = (type, text) => {
        const newFriends = friends
        const newFriendsIndx = newFriends.findIndex(array => array[0] === currentFriend.id);
        if (type === "message") {
            newFriends[newFriendsIndx][3] = text
            setFriends(newFriends)
        } else if (type === "file") {
            newFriends[newFriendsIndx][3] = "File has been sent"
            setFriends(newFriends)
        }

    }

    const fileUpload = (file, fileName) => {
        const formData = new FormData();
        formData.append("files", file, fileName);
        const url = process.env.REACT_APP_API_URL + "file/"
        axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": localStorage.getItem("token")
                },
            })
            .then((response) => {
                // handle the response
                console.log("Upload success");
            })
            .catch((error) => {
                // handle errors
                console.log(error);
            });

    }

    const handleSend = () =>{

        if (file) {
            const sendFile = sendData("file")
            const fileInfo = {
                "file_id": uuidv4() + "." +file.name.split(".")[1],
                "file_name": file.name
            }
            sendFile.content = JSON.stringify(fileInfo)
            sendFile.id = uuidv4()
            fileUpload(file, fileInfo.file_id)
            console.log(sendFile)
            const isSuccess = sendWebSocket(sendFile)
            if (isSuccess) {
                updateLastMessage("file", null)
            }
            setFile(null)
            setText("");


        } else {
            const sendMessage = sendData("message")
            sendMessage.content = text
            sendMessage.id = uuidv4()
            const isSuccess = sendWebSocket(sendMessage)
            if (isSuccess) {
                updateLastMessage("message", text)
            }
            setText("");
        }

        // const sendMessage = {
        //     "type": "message",
        //     "sender_id": parseInt(localStorage.getItem("id")),
        //     "receiver_id": currentFriend.id,
        //     "content": text
        // }
        // if (ws && ws.readyState === WebSocket.OPEN) {
        //     ws.send(JSON.stringify(sendMessage));
        //     // update messages in chat box
        //     const message = {
        //         "id": uuidv4(),
        //         "type": "message",
        //         "sender_id": parseInt(localStorage.getItem("id")),
        //         "receiver_id": currentFriend.id,
        //         "content": text
        //     }
        //     setMessages([
        //         ...messages,
        //         message
        //     ]);
        //     // update last message from friend list
        //     const newFriends = friends
        //     const newFriendsIndx = newFriends.findIndex(array => array[0] === currentFriend.id);
        //     newFriends[newFriendsIndx][3] = text
        //     setFriends(newFriends)
        // } else {
        //     console.error('WebSocket not connected.');
        // }
        // setText("");
    }
    return (
        <div className="input">
            <input
                type="text"
                placeholder="Type something..."
                onChange={(e) => setText(e.target.value)}
                value={text}

            />
            <div className="send">
                <input
                    type="file"
                    style={{display: "none"}}
                    id="file"
                    onChange={(e) => {
                        setFile(e.target.files[0])
                        setText(e.target.files[0].name)
                    }}
                />
                <label htmlFor="file">
                    <img src={Attach} alt=""/>
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
}

export default Input