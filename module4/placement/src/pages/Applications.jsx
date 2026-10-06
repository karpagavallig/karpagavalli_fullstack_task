import { Link } from "react-router-dom";
import { usePlacement } from "../context/PlacementContext";

function Applications() {
    const { applications, jobs } = usePlacement();

    const getJob = (jobId) => {
        return jobs.find(
            (job) => Number(job.id) === Number(jobId)
        );
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <span className="page-eyebrow">
                        APPLICATION TRACKING
                    </span>

                    <h1>My Applications</h1>

                    <p>
                        Track your placement applications and
                        monitor their current status.
                    </p>
                </div>

                <div className="application-header-actions">
                    <div className="job-count">
                        <strong>{applications.length}</strong>
                        <span>
                            {applications.length === 1
                                ? "Application"
                                : "Applications"}
                        </span>
                    </div>

                    <Link
                        to="/jobs"
                        className="primary-button"
                    >
                        Explore Jobs →
                    </Link>
                </div>
            </div>

            {applications.length === 0 ? (
                <div className="empty-state">
                    <div>▣</div>

                    <h2>No Applications Yet</h2>

                    <p>
                        You haven't applied to any placement
                        opportunities yet. Explore available jobs
                        and start your career journey.
                    </p>

                    <Link
                        to="/jobs"
                        className="primary-button"
                    >
                        Browse Job Openings
                    </Link>
                </div>
            ) : (
                <div className="applications-list">
                    {applications.map((application) => {
                        const job = getJob(
                            application.jobId
                        );

                        const statusClass =
                            application.status ===
                            "Selected"
                                ? "selected"
                                : application.status ===
                                  "Rejected"
                                ? "rejected"
                                : "review";

                        return (
                            <article
                                className="application-card"
                                key={application.id}
                            >
                                <div className="company-logo">
                                    {job?.logo ||
                                        application.company
                                            ?.charAt(0)
                                            ?.toUpperCase() ||
                                        "C"}
                                </div>

                                <div className="application-info">
                                    <h3>
                                        {application.position}
                                    </h3>

                                    <p>
                                        {application.company}
                                    </p>

                                    <div className="application-meta">
                                        <span>
                                            💰{" "}
                                            {
                                                application.package
                                            }
                                        </span>

                                        <span>
                                            📍{" "}
                                            {
                                                application.location
                                            }
                                        </span>

                                        <span>
                                            📅 Applied:{" "}
                                            {
                                                application.appliedDate
                                            }
                                        </span>
                                    </div>
                                </div>

                                <div className="application-status-wrapper">
                                    <span
                                        className={`application-status ${statusClass}`}
                                    >
                                        {application.status ===
                                        "Selected"
                                            ? "✓ Selected"
                                            : application.status ===
                                              "Rejected"
                                            ? "✕ Rejected"
                                            : "◷ Under Review"}
                                    </span>
                                </div>

                                {job && (
                                    <Link
                                        to={`/jobs/${job.id}`}
                                        className="view-job-button"
                                    >
                                        View Job
                                    </Link>
                                )}
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default Applications;