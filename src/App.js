import Login from "./pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./style.scss"
import Home from "./pages/Home";
import ProtectedRoute from "./context/ProtectRoute";


const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<Login/>}/>
                <Route element={<ProtectedRoute />}>
                    <Route path='/' element={<Home/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
