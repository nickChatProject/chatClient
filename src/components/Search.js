import Navbar from "./Navbar";
import SearchUser from "./SearchUser";
import SearchBar from "./SearchBar";
import {useContext, useState} from "react";
import {ChatContext} from "../context/ChatContext";


const Search = () => {
    const { users, setUsers } = useContext(ChatContext)
    return (
        <div className="search">
            <Navbar />
            <SearchBar users={users} setUsers={setUsers}/>
            <SearchUser users={users} setUsers={setUsers}/>
        </div>
    )

}
export default Search