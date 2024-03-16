const Search = () => {
    return (
        <div className="search">
            <div className="searchForm">
                <input
                    type="text"
                    placeholder="Find a user"

                />
            </div>

            <div className="userChat" >
                <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt=""/>
                <div className="userChatInfo">
                    <span>John</span>
                    <p>Hello</p>
                </div>
            </div>

        </div>
    );
}
export default Search