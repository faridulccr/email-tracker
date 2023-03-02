import openImage from "./circle-check-regular.svg";
import sentImage from "./envelope-circle-check-solid.svg";
import "./Status.style.scss";
const Status = ({ recipients, deleteEmail, loading, sentLoading, error }) => {
    return (
        <>
            <div className="status-container">
                {loading && <h1>Loading...</h1>}
                {!loading &&
                    !error &&
                    Array.isArray(recipients) &&
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
                                            <div className="status-img-container">
                                                <strong>Status: </strong>
                                                <img
                                                    className="status-img"
                                                    src={
                                                        recipient.status ===
                                                        "Sent"
                                                            ? sentImage
                                                            : openImage
                                                    }
                                                    style={
                                                        recipient.status ===
                                                        "Sent"
                                                            ? { padding: "5px" }
                                                            : { padding: 0 }
                                                    }
                                                    alt="status"
                                                />
                                                <strong>
                                                    {recipient.status}
                                                </strong>
                                            </div>
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
                                                <strong>Recipient: </strong>
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
