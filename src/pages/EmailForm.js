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
    const [useCC, setUseCC] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sentLoading, setSentLoading] = useState(false);
    const [error, setError] = useState(false);
    const [recipients, setRecipients] = useState([]);

    useEffect(() => {
        const getAllRecipients = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_API_DOMAIN}/recipient`
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
        if (userInput.name === "useCC") {
            setUseCC(userInput.checked);
        } else {
            setEmailData({
                ...emailData,
                [userInput.name]: userInput.value,
            });
        }
    };

    // to handle form submit
    const handleSubmit = (event) => {
        event.preventDefault();
        if (useCC && emailData.to.length > 0) {
            const ccEmails = emailData.to.split(",");
            Array.isArray(ccEmails) &&
                ccEmails.length > 0 &&
                ccEmails.forEach((email) => {
                    sentEmail(email);
                });
        } else {
            sentEmail(emailData.to);
        }
    };

    async function sentEmail(to) {
        try {
            setError(false);
            setSentLoading(true);
            const response = await axios.post(
                `${process.env.REACT_APP_BACKEND_API_DOMAIN}/recipient/send-email`,
                {
                    adminEmail: process.env.REACT_APP_EMAIL_ID,
                    recipient: to,
                    subject: emailData.subject,
                    message: emailData.message,
                }
            );
            // console.log(response.data);
            setRecipients((prev) => {
                return [...prev, response.data];
            });
            setSentLoading(false);
        } catch (error) {
            setError();
            setSentLoading(false);
            console.error(error);
        }
    }

    const deleteEmail = async (id) => {
        setRecipients((prevRecipients) => {
            const updatedRecipients = prevRecipients.filter(
                (recipient) => recipient.id !== id
            );
            return updatedRecipients;
        });
        const response = await axios.delete(
            `${process.env.REACT_APP_BACKEND_API_DOMAIN}/recipient/delete-email/${id}`
        );
        console.log(response.data);
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
                    <div className="use-cc-container">
                        <input
                            id="use-cc"
                            type="checkbox"
                            name="useCC"
                            value={useCC}
                            onChange={handleChange}
                        />{" "}
                        <label>Use CC format</label>
                    </div>
                    <input
                        type="email"
                        name="to"
                        placeholder={
                            useCC ? "Enter email separated by Comma" : "To"
                        }
                        value={emailData.to}
                        onChange={handleChange}
                        required
                        multiple={!!useCC}
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
                <Status
                    recipients={recipients}
                    deleteEmail={deleteEmail}
                    loading={loading}
                    sentLoading={sentLoading}
                    error={error}
                />
            </div>
        </>
    );
};
export default EmailForm;
