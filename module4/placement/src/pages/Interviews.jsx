import { Link } from "react-router-dom";
import { interviews } from "../data/mockData";

function Interviews() {
    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <span className="page-eyebrow">
                        INTERVIEW SCHEDULE
                    </span>

                    <h1>My Interviews</h1>

                    <p>
                        View your upcoming placement interviews and
                        meeting details.
                    </p>
                </div>

                <div className="job-count">
                    <strong>{interviews.length}</strong>
                    <span>Upcoming Interviews</span>
                </div>
            </div>

            {interviews.length === 0 ? (
                <div className="empty-state">
                    <div>◷</div>

                    <h2>No Interviews Scheduled</h2>

                    <p>
                        You currently don't have any upcoming
                        placement interviews.
                    </p>

                    <Link
                        to="/jobs"
                        className="primary-button"
                    >
                        Explore Job Openings →
                    </Link>
                </div>
            ) : (
                <div className="interviews-grid">
                    {interviews.map((interview) => (
                        <article
                            className="interview-card"
                            key={interview.id}
                        >
                            <div className="interview-card-top">
                                <div className="company-logo">
                                    {interview.logo}
                                </div>

                                <span className="interview-status">
                                    Upcoming
                                </span>
                            </div>

                            <div className="interview-company">
                                {interview.company}
                            </div>

                            <h2>{interview.position}</h2>

                            <div className="interview-round">
                                <span>Interview Round</span>
                                <strong>{interview.round}</strong>
                            </div>

                            <div className="interview-details">
                                <div>
                                    <span>📅</span>
                                    <div>
                                        <small>Date</small>
                                        <strong>
                                            {interview.date}
                                        </strong>
                                    </div>
                                </div>

                                <div>
                                    <span>◷</span>
                                    <div>
                                        <small>Time</small>
                                        <strong>
                                            {interview.time}
                                        </strong>
                                    </div>
                                </div>

                                <div>
                                    <span>💻</span>
                                    <div>
                                        <small>Mode</small>
                                        <strong>
                                            {interview.mode}
                                        </strong>
                                    </div>
                                </div>

                                <div>
                                    <span>▣</span>
                                    <div>
                                        <small>Platform</small>
                                        <strong>
                                            {interview.meeting}
                                        </strong>
                                    </div>
                                </div>
                            </div>

                            <div className="interview-actions">
                                <a
                                    href={interview.meetingUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="primary-button"
                                >
                                    Join Meeting →
                                </a>

                                <Link
                                    to="/notifications"
                                    className="outline-button"
                                >
                                    View Notifications
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Interviews;