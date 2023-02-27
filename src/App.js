import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EmailForm from "./pages/EmailForm";
import Login from "./pages/Login";

const App = () => {
    const [isLogin, setIsLogin] = useState(true);
    const handleLogin = (value) => {
        setIsLogin(value);
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login handleLogin={handleLogin} />} />

                <Route
                    path="/tracking-app"
                    element={
                        isLogin ? (
                            <EmailForm />
                        ) : (
                            <Login handleLogin={handleLogin} />
                        )
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
