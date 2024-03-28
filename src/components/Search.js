import {useState} from "react";
import axios from "axios";
import DefaultUserIcon from "../img/defaultUserIcon.png";

const Search = () => {
    const [userName, setUserName] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false);
    const [userPhtotUrl, setUserPhotoUrl] = useState("")

    const handleSearch = () => {
        const url = process.env.REACT_APP_API_URL + "friends_by_name/"
        const user = {"name": userName}
        axios.post(url, user, {headers:{"Authorization": localStorage.getItem("token")}})
            .then(res=> {
                setUser(res.data)
                setErr(false);
            })
            .catch(err=> {
                console.error('Error fetching data:', err);
                setErr(true);
                setUser(null)

            })
    }
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch()
    }

    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Find a user"
                    onKeyDown={handleKey}
                    onChange={e=>setUserName(e.target.value)}
                />
            </div>
            {err && <span>Friend not found!</span>}
            {user && (
                <div className="userChat">
                    <img src={user.friends[0][2]? process.env.REACT_APP_API_URL + "image/?image=" + user.friends[0][2]: DefaultUserIcon} alt="" />
                    <div className="userChatInfo">
                        <span>{user.friends[0][1]}</span>
                    </div>
                </div>
            )}

        </div>
    );
}
export default Search