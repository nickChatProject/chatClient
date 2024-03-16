import {useNavigate} from "react-router-dom";
import axios from "axios";


const Login = () => {
    const navigate = useNavigate();
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
            console.log(response);
            navigate("/home")
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