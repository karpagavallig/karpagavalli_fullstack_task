import { Link } from "react-router-dom";
import { usePlacement } from "../context/PlacementContext";

function JobCard({ job }) {
    const { applications } = usePlacement();

    const applied = applications.some(
        (application) =>
            Number(application.jobId) === Number(job.id)
    );

    return (
        <article className="job-card">
            <div className="job-card-top">
                <div className="company-logo">
                    {job.logo}
                </div>

                <span className="job-status">
                    {job.status}
                </span>
            </div>

            <div className="job-card-content">
                <h3>{job.position}</h3>

                <p className="company-name">
                    {job.company}
                </p>

                <div className="job-meta">
                    <span>
                        📍 {job.location}
                    </span>

                    <span>
                        💼 {job.type}
                    </span>
                </div>

                <div className="job-salary">
                    {job.package}
                </div>

                <div className="skills">
                    {job.skills.map((skill) => (
                        <span key={skill}>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className="job-footer">
                <div className="job-deadline">
                    <small>
                        Application Deadline
                    </small>

                    <strong>
                        {job.deadline}
                    </strong>
                </div>

                <div className="job-card-actions">
                    <Link
                        to={`/jobs/${job.id}`}
                        className="view-job-button"
                    >
                        View Details
                    </Link>

                    {applied ? (
                        <Link
                            to={`/jobs/${job.id}`}
                            className="applied-button"
                        >
                            ✓ Applied
                        </Link>
                    ) : (
                        <Link
                            to={`/jobs/${job.id}`}
                            className="apply-button"
                        >
                            Apply Now
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}

export default JobCard;