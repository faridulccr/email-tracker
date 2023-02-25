import "./Status.style.scss";
const Status = ({ recipients }) => {
    return (
        <>
            <div className="status-container">
                {recipients.map((recipient, index) => {
                    return (
                        <div className="status-card" key={index}>
                            <div className="status-sec">
                                <p>
                                    <strong>Status:{recipient.status}</strong>
                                </p>
                                <p>{recipient.statusTime}</p>
                            </div>
                            <div className="body-sec">
                                <p>
                                    <strong>Subject:</strong>{" "}
                                    {recipient.subject}
                                </p>
                                <p>
                                    <strong>Message:</strong>{" "}
                                    {recipient.message}
                                </p>
                            </div>
                            <div className="time-log">
                                <p>
                                    <strong>Sent:</strong> {recipient.sentTime}
                                </p>
                                <p className="recipient">
                                    <strong>Recipient:</strong>
                                    {recipient.recipient}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Status;
