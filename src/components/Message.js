

const Message = ({ message }) => {


    return (
        <div className="message owner">
            <div className="messageInfo">
                <img
                    src = ""
                    alt=""
                />
                <span>just now</span>
            </div>
            <div className="messageContent">
                <p>hello</p>
                {message.img && <img src={message.img} alt="" />}
            </div>
        </div>
    );
};

export default Message;