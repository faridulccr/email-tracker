import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmailForm from "./pages/EmailForm";
import Login from "./pages/Login";

const App = () => {
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        let loginStatus = sessionStorage.getItem("loginStatus"); // it is JSON format
        if (loginStatus) {
            loginStatus = JSON.parse(loginStatus); // here JSON.parse create an Array
            const { adminEmail, adminPass } = loginStatus;
            if (
                adminEmail === process.env.REACT_APP_ADMIN &&
                adminPass === process.env.REACT_APP_ADMIN_PASS
            ) {
                setIsLogin(true);
            }
        } else {
            setIsLogin(false);
        }
    }, []);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isLogin ? <EmailForm /> : <Login />} />
                <Route
                    path="/tracking-page"
                    element={isLogin ? <EmailForm /> : <Login />}
                />
                <Route path="*" element={<h1>Page was not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
