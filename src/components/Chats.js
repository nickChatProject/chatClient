import DefaultUserIcon from "../img/defaultUserIcon.png"
const Chats = () => {
    return (
        <div className="chats">
            <div className="userChat hover">
                <img src={DefaultUserIcon} alt=""/>
                <div className="userChatInfo">
                    <span>John</span>
                    <p>Hello</p>
                </div>
            </div>
            <div className="userChat">
                <img src="" alt=""/>
                <div className="userChatInfo">
                    <span>John</span>
                </div>
            </div>
            <div className="userChat">
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt=""/>
                <div className="userChatInfo">
                    <span>John</span>
                    <p>Hello</p>
                </div>
            </div>
        </div>

    );

}

export default Chats