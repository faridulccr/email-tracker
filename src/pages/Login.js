import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.style.scss";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [isMatch, setIsMatch] = useState(true);
    const navigate = useNavigate();

    // to handle user input
    const handleChange = (event) => {
        const userInput = event.target;
        setFormData({
            ...formData,
            [userInput.name]: userInput.value,
        });
    };

    // to handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            formData.email === process.env.REACT_APP_ADMIN &&
            formData.password === process.env.REACT_APP_ADMIN_PASS
        ) {
            setIsMatch(true);
            sessionStorage.setItem(
                "loginStatus",
                JSON.stringify({
                    adminEmail: process.env.REACT_APP_ADMIN,
                    adminPass: process.env.REACT_APP_ADMIN_PASS,
                })
            );
            navigate("/tracking-page");
            window.location.reload(false);
            // The false parameter tells the browser to reload the page from its cache
        } else {
            setIsMatch(false);
            setTimeout(() => {
                setIsMatch(true);
            }, 5000);
        }
    };

    return (
        <>
            <div className="login-form-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <div className="btn-container">
                        <input type="submit" value="login" />
                    </div>
                    {!isMatch && <p>Don't Match your information</p>}
                </form>
            </div>
        </>
    );
};

export default Login;
