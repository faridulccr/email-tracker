import "./Status.style.scss";
const Status = ({ recipients, deleteEmail }) => {
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
                                <p>
                                    {new Date(
                                        recipient.statusTime
                                    ).toLocaleString("en-US")}
                                </p>
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
                                <div className="dlt-btn-container">
                                    <p>
                                        <strong>Sent:</strong>{" "}
                                        {new Date(
                                            recipient.sentTime
                                        ).toLocaleString("en-US")}
                                    </p>
                                    <p>
                                        <button
                                            className="delete-btn"
                                            onClick={() => {
                                                deleteEmail(recipient.id);
                                            }}
                                        >
                                            +
                                        </button>
                                    </p>
                                </div>
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
