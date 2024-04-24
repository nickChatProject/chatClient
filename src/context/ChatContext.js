import {createContext, useState} from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [currentFriend, setCurrentFriend] = useState({});
    const [messages, setMessages] = useState([])
    const [friends, setFriends] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [file, setFile] = useState(null);
    const [currentComponent, setCurrentComponent] = useState('sidebar');
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [notices, setNotices] = useState([])
    const [users, setUsers] = useState([])
    const [isClosed, setIsClosed] = useState(true)


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
    }

    const handleTokenExpire = (errMsg) => {
        if (errMsg === "User does not login or token is expired.") {
            if (window.confirm("Token is expired! Please login again.")) {
                localStorage.removeItem("id")
                localStorage.removeItem("token")
                localStorage.removeItem("picture")
                return true
            } else {
                return false
            }
        }

    }

    return (
        <ChatContext.Provider value={{ currentFriend, getFriendInfo, messages, setMessages, friends,
            setFriends, currentUser, setCurrentUser, file, setFile, currentComponent, setCurrentComponent,
            isPopupOpen, setPopupOpen, notices, setNotices, users, setUsers, isClosed, setIsClosed, handleTokenExpire }}>
            {children}
        </ChatContext.Provider>
    );
};
//
//
//
// import {
//     createContext,
//     useContext,
//     useReducer,
// } from "react";
//
// export const ChatContext = createContext();
//
// export const ChatContextProvider = ({ children }) => {
//     const INITIAL_STATE = {
//         "id": null,
//         "name": null,
//         "picture": null
//     };
//
//     const chatReducer = (state, action) => {
//         switch (action.type) {
//             case "CHANGE_USER":
//                 const array = action.payload
//                 let picture = ""
//                  if (array[2]) {
//                      picture = array[2]
//                  }
//                 return {
//                     "id": array[0],
//                     "name": array[1],
//                     "picture": picture
//                 };
//
//             default:
//                 return state;
//         }
//     };
//
//     const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
//
//     return (
//         <ChatContext.Provider value={{ currentFriend:state, dispatch }}>
//             {children}
//         </ChatContext.Provider>
//     );
// };