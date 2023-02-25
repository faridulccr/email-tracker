import axios from "axios";
import { useEffect, useState } from "react";
import Status from "../components/Status";
import "./EmailForm.style.scss";

const EmailForm = () => {
    const [emailData, setEmailData] = useState({
        from: "",
        to: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [recipients, setRecipients] = useState([]);

    useEffect(() => {
        const getAllRecipients = async () => {
            try {
                const response = await axios.get(
                    "http://emailtracking.herokuapp.com/recipient"
                );
                setRecipients(response.data);
                setLoading(false);
                // console.log(response.data);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        getAllRecipients();
    }, []);

    // to handle user input
    const handleChange = (event) => {
        const userInput = event.target;
        setEmailData({
            ...emailData,
            [userInput.name]: userInput.value,
        });
    };

    // to handle form submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setError(false);
            setLoading(true);
            const response = await axios.post(
                "http://emailtracking.herokuapp.com/recipient/send-email",
                {
                    adminEmail: process.env.REACT_APP_EMAIL_ID,
                    recipient: emailData.to,
                    subject: emailData.subject,
                    message: emailData.message,
                }
            );
            // console.log(response.data);
            setRecipients((prev) => {
                return [...prev, response.data];
            });
            setLoading(false);
        } catch (error) {
            setError(true);
            setLoading(false);
            console.error(error);
        }
    };

    // handle reset
    const handleReset = () => {
        setEmailData({
            from: "",
            to: "",
            subject: "",
            message: "",
        });
    };
    return (
        <>
            <div className="email-form-container">
                <form
                    className="email-form"
                    onSubmit={handleSubmit}
                    onReset={handleReset}
                >
                    <input
                        type="email"
                        name="from"
                        placeholder="From"
                        value={emailData.from}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="to"
                        placeholder="To"
                        value={emailData.to}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={emailData.subject}
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        placeholder="Message"
                        name="message"
                        value={emailData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                    <div className="btn-container">
                        <input type="reset" value="Reset" />
                        <input type="submit" value="Send" />
                    </div>
                </form>
                {loading && <h1>Loading...</h1>}
                {!loading && !error && recipients.length > 0 && (
                    <Status recipients={recipients} />
                )}
            </div>
        </>
    );
};
export default EmailForm;
