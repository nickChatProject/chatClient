import {Navigate, Outlet} from "react-router-dom";


const ProtectedRoute = () => {
    const isLogin = localStorage.getItem("token")
    return isLogin? <Outlet /> : <Navigate to="/login" />
};

export default ProtectedRoute;