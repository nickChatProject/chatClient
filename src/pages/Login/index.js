import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect} from "react";
import {ChatContext} from "../../context/ChatContext";


const Login = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(ChatContext)

    useEffect(() => {
        const isLogin = localStorage.getItem("token")
        if (isLogin) {
            navigate('/')
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const account = e.target[0].value;
        const password = e.target[1].value;
        const authUrl = process.env.REACT_APP_API_URL + "user_login/"

        try {
            const userInfo = {
                account: account,
                password: password,
            }
            const response = await axios.post(authUrl, userInfo);
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("id", response.data.user_id)
            localStorage.setItem("picture", response.data.picture)
            setCurrentUser(response.data.user_id)
            console.log(response);
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">chatApp</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="account"/>
                    <input type="password" placeholder="password"/>
                    <button>Sign in</button>
                </form>
                <p>Forget password?</p>
            </div>
        </div>
    )
}

export default Login