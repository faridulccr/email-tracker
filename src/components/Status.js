import "./Status.style.scss";
const Status = ({ recipients, deleteEmail, loading, sentLoading, error }) => {
    return (
        <>
            <div className="status-container">
                {loading && <h1>Loading...</h1>}
                {!loading &&
                    !error &&
                    recipients.length > 0 &&
                    recipients.map((recipient, index) => {
                        return (
                            <>
                                <div className="all-card-container" key={index}>
                                    <button
                                        className="delete-btn"
                                        onClick={() => {
                                            deleteEmail(recipient.id);
                                        }}
                                    >
                                        +
                                    </button>

                                    <div className="status-card">
                                        <div className="status-sec">
                                            <p>
                                                <strong>
                                                    Status:
                                                    {recipient.status}
                                                </strong>
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
                                            <p>
                                                <strong>Sent:</strong>{" "}
                                                {new Date(
                                                    recipient.sentTime
                                                ).toLocaleString("en-US")}
                                            </p>

                                            <p className="recipient">
                                                <strong>Recipient:</strong>
                                                {recipient.recipient}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })}
                {sentLoading && <h3 className="sent-loading">Loading...</h3>}
            </div>
        </>
    );
};

export default Status;
