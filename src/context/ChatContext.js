import {createContext, useState} from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const [currentFriend, setCurrentFriend] = useState({});
    const [messages, setMessages] = useState([])
    const [friends, setFriends] = useState([])
    const [currentUser, setCurrentUser] = useState(null)


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
        <ChatContext.Provider value={{ currentFriend, getFriendInfo, messages, setMessages, friends, setFriends, currentUser, setCurrentUser }}>
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