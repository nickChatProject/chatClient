import Sidebar from "../../components/Sidebar";
import Chat from "../../components/Chat";
import Toolbar from "../../components/Toolbar";

const Home = () => {
    return (
        <div className='home'>
            <div className="container">
                <Toolbar/>
                <Sidebar/>
                <Chat/>


            </div>
        </div>
    )
}

export default Home