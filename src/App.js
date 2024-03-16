import Login from "./pages/Login";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import "./style.scss"
import Home from "./pages/Home";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">

                    <Route path="login" element={<Login />} />
                    <Route path="home" element={<Home />} />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}
export default App;
