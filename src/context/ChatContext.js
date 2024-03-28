import {createContext, useState} from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [currentFriend, setCurrentFriend] = useState({});


    const getFriendInfo = (array) => {
        let picture = ""
        if (array[2]) {
            picture = array[2]
        }
        const friendInfo = {
            "id": array[0],
            "name": array[1],
            "picture": picture
        }
        setCurrentFriend(friendInfo)
        console.log(currentFriend)
    }

    return (
        <ChatContext.Provider value={{ currentFriend, getFriendInfo }}>
            {children}
        </ChatContext.Provider>
    );
};



