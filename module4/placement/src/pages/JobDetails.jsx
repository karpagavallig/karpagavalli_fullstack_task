import { Link, useNavigate, useParams } from "react-router-dom";
import { usePlacement } from "../context/PlacementContext";

function JobDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        jobs,
        applications,
        applyForJob,
    } = usePlacement();

    const job = jobs.find(
        (item) => Number(item.id) === Number(id)
    );

    if (!job) {
        return (
            <div className="page-container">
                <div className="empty-state">
                    <div>!</div>

                    <h2>Job Not Found</h2>

                    <p>
                        The job opportunity you're looking for
                        could not be found.
                    </p>

                    <Link
                        to="/jobs"
                        className="primary-button"
                    >
                        ← Back to Job Openings
                    </Link>
                </div>
            </div>
        );
    }

    const applied = applications.some(
        (application) =>
            Number(application.jobId) === Number(job.id)
    );

    const handleApply = () => {
        if (applied) {
            navigate("/applications");
            return;
        }

        const result = applyForJob(job.id);

        if (result.success) {
            navigate("/applications");
        } else {
            alert(result.message);
        }
    };

    return (
        <div className="page-container">
            <Link
                to="/jobs"
                className="back-link"
            >
                ← Back to Job Openings
            </Link>

            {/* Job Header */}
            <section className="job-details-header">
                <div className="job-details-company">
                    <div className="large-company-logo">
                        {job.logo}
                    </div>

                    <div>
                        <span className="detail-company">
                            {job.company}
                        </span>

                        <h1>{job.position}</h1>

                        <p>
                            📍 {job.location}
                            <span> • </span>
                            💼 {job.type}
                            <span> • </span>
                            {job.experience}
                        </p>
                    </div>
                </div>

                <span className="job-status">
                    {job.status}
                </span>
            </section>

            {/* Job Summary */}
            <section className="job-detail-info">
                <div>
                    <span>Salary Package</span>
                    <strong>{job.package}</strong>
                </div>

                <div>
                    <span>Application Deadline</span>
                    <strong>{job.deadline}</strong>
                </div>

                <div>
                    <span>Experience</span>
                    <strong>{job.experience}</strong>
                </div>

                <div>
                    <span>Eligibility</span>
                    <strong>{job.eligibility}</strong>
                </div>
            </section>

            <div className="job-detail-grid">
                {/* Main Details */}
                <section className="dashboard-panel">
                    <div className="panel-heading">
                        <div>
                            <h2>About the Role</h2>

                            <p>
                                Job description and
                                requirements
                            </p>
                        </div>
                    </div>

                    <div className="detail-description">
                        <p>{job.description}</p>
                    </div>

                    <div className="detail-section">
                        <h2>Required Skills</h2>

                        <div className="detail-skills">
                            {job.skills.map((skill) => (
                                <span key={skill}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="detail-section">
                        <h2>Eligibility</h2>

                        <p className="eligibility-text">
                            {job.eligibility}
                        </p>
                    </div>

                    <div className="detail-section">
                        <h2>Job Information</h2>

                        <div className="job-information-grid">
                            <div>
                                <span>Company</span>
                                <strong>
                                    {job.company}
                                </strong>
                            </div>

                            <div>
                                <span>Location</span>
                                <strong>
                                    {job.location}
                                </strong>
                            </div>

                            <div>
                                <span>Job Type</span>
                                <strong>
                                    {job.type}
                                </strong>
                            </div>

                            <div>
                                <span>Experience</span>
                                <strong>
                                    {job.experience}
                                </strong>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Apply Panel */}
                <aside className="dashboard-panel apply-panel">
                    <div className="apply-icon">
                        {applied ? "✓" : "→"}
                    </div>

                    <h2>
                        {applied
                            ? "Application Submitted"
                            : "Interested in this opportunity?"}
                    </h2>

                    <p>
                        {applied
                            ? "You have already applied for this position. You can track your application status below."
                            : "Submit your application before the deadline to be considered for this opportunity."}
                    </p>

                    <div className="apply-summary">
                        <div>
                            <span>Company</span>
                            <strong>
                                {job.company}
                            </strong>
                        </div>

                        <div>
                            <span>Position</span>
                            <strong>
                                {job.position}
                            </strong>
                        </div>

                        <div>
                            <span>Package</span>
                            <strong>
                                {job.package}
                            </strong>
                        </div>

                        <div>
                            <span>Deadline</span>
                            <strong>
                                {job.deadline}
                            </strong>
                        </div>
                    </div>

                    {applied ? (
                        <button
                            type="button"
                            className="applied-button full"
                            onClick={() =>
                                navigate(
                                    "/applications"
                                )
                            }
                        >
                            ✓ View My Application
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="apply-button full"
                            onClick={handleApply}
                        >
                            Apply for this Position →
                        </button>
                    )}

                    <small>
                        By applying, you confirm that your
                        profile information is accurate and
                        up to date.
                    </small>
                </aside>
            </div>
        </div>
    );
}

export default JobDetails;