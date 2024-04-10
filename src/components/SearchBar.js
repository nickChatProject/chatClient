import Search from "../img/search.png";
import {useState} from "react";

import axios from "axios";
const SearchBar = (props) => {
    const [email, setEmail] = useState("")
    const [errorMessage, setErrorMessage] = useState("");


    const handleSearch = () => {
        if (!email || !isValidEmail(email)) {
            setErrorMessage("Invalid email address!");
            console.log(errorMessage)
            setEmail("")
            return;
        }

        console.log(email)
        const url = process.env.REACT_APP_API_URL + "search_user/email/"
        const mail = {
            email: email,
        }
        console.log(mail)
        console.log(localStorage.getItem("token"))
        axios.post(
            url, mail, {
                headers:{"Authorization": localStorage.getItem("token")}
            }
        ).then(
            res =>{
                props.setUsers(res.data)
                console.log(res.data)
            }
        ).catch(
            err => {
                console.error('Error fetching data:', err);
            }
        )
        setEmail("")
        setErrorMessage("")
    };

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <div className="searchBar">
            <div className="searchForm">
                <div className="text">
                    <input
                        type="email"
                        className={errorMessage ? "error" : ""}
                        placeholder={errorMessage ? errorMessage : "Find a user by email"}
                        onChange={(e) => {
                            setEmail(e.target.value)
                            //if (errorMessage) setErrorMessage("");
                        }}
                        value={email}

                    />
                </div>
                <div className="searchIcon">
                    <button>Advance</button>
                    <img src={Search} alt="" onClick={handleSearch}/>
                </div>

            </div>
        </div>
    )
}
export default SearchBar