import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useContext, useEffect} from "react";
import {ChatContext} from "../../context/ChatContext";
import {useForm} from "react-hook-form";


const Login = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(ChatContext)
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    useEffect(() => {
        const isLogin = localStorage.getItem("token")
        if (isLogin) {
            navigate('/')
        }
    },[])

    const onSubmit = async (data) => {

        const account = data.account;
        const password = data.password;
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder={errors.account?errors.account.message:"account"}
                        {...register('account', {
                            required: 'Must not be empty!',
                        })}
                    />
                    <input
                        type="password"
                        placeholder={errors.password?errors.password.message:"password"}
                        {...register('password', {
                            required: 'Must not be empty!',
                        })}
                    />
                    <button>Sign in</button>
                </form>
                <p>Forget password?</p>
            </div>
        </div>
    )
}

export default Login