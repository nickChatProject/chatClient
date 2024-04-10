import DefaultUserIcon from "../img/defaultUserIcon.png";

const SearchUser = (props) => {
    return (
        <div className="users">
            {props.users?.map((user) => (
                <div className="userList"
                     key={user.cid.toString()}
                >
                    <img src={user.picture?process.env.REACT_APP_API_URL + "image/?image=" + user.picture: DefaultUserIcon} alt="" />
                    <div className="userInfo">
                        <span>{user.username}</span>
                        <p>{user.email}</p>
                    </div>
                </div>
            ))}
        </div>
    )

}
export default SearchUser