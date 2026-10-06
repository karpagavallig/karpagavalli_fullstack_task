import { Link } from "react-router-dom";
import StatCard from "../component/StatCard";
import NotificationItem from "../component/NotificationItem";

import { monthlyStats, notifications } from "../data/mockData";
import { usePlacement } from "../context/PlacementContext";

function Dashboard() {
    const {
        user,
        jobs,
        applications
    } = usePlacement();

    const totalApplications = applications.length;

    const underReview = applications.filter(
        (application) =>
            application.status === "Under Review"
    ).length;

    const selected = applications.filter(
        (application) =>
            application.status === "Selected"
    ).length;

    const openJobs = jobs.filter(
        (job) =>
            job.status === "Open"
    ).length;

    const latestJobs = jobs.slice(0, 4);

    return (
        <div className="page-container">

            {/* ================================
                WELCOME SECTION
            ================================= */}

            <section className="welcome-section">

                <div>

                    <span className="date-label">
                        OCTOBER 2026
                    </span>

                    <h1>
                        Good morning,{" "}
                        <span>
                            {user?.name
                                ? user.name.split(" ")[0]
                                : "Student"}
                        </span>{" "}
                        👋
                    </h1>

                    <p>
                        Here's what's happening with
                        your placement journey today.
                    </p>

                </div>

                <Link
                    to="/jobs"
                    className="primary-button"
                >
                    Explore Jobs →
                </Link>

            </section>


            {/* ================================
                STATISTICS
            ================================= */}

            <section className="stats-grid">

                <StatCard
                    title="Total Jobs Applied"
                    value={totalApplications}
                    subtitle="Your applications"
                    icon="📄"
                    type="purple"
                />

                <StatCard
                    title="Under Review"
                    value={underReview}
                    subtitle="Applications active"
                    icon="⏳"
                    type="orange"
                />

                <StatCard
                    title="Interviews"
                    value="2"
                    subtitle="Upcoming interviews"
                    icon="◷"
                    type="blue"
                />

                <StatCard
                    title="Selected"
                    value={selected}
                    subtitle="Offers received"
                    icon="✓"
                    type="green"
                />

            </section>


            {/* ================================
                MAIN DASHBOARD
            ================================= */}

            <div className="dashboard-grid">

                {/* PLACEMENT OVERVIEW */}

                <section className="dashboard-panel chart-panel">

                    <div className="panel-heading">

                        <div>

                            <h2>
                                Placement Overview
                            </h2>

                            <p>
                                Applications and selections by month
                            </p>

                        </div>

                        <span className="chart-year">
                            2026
                        </span>

                    </div>


                    <div className="chart">

                        {monthlyStats.map((item) => (

                            <div
                                className="chart-column"
                                key={item.month}
                            >

                                <div className="chart-bars">

                                    <div
                                        className="bar applications-bar"
                                        style={{
                                            height:
                                                `${Math.max(
                                                    item.applications * 2,
                                                    25
                                                )}px`
                                        }}
                                        title={`Applications: ${item.applications}`}
                                    ></div>


                                    <div
                                        className="bar selected-bar"
                                        style={{
                                            height:
                                                `${Math.max(
                                                    item.selected * 7,
                                                    15
                                                )}px`
                                        }}
                                        title={`Selected: ${item.selected}`}
                                    ></div>

                                </div>

                                <span>
                                    {item.month}
                                </span>

                            </div>

                        ))}

                    </div>


                    <div className="chart-legend">

                        <span>

                            <i className="legend-dot applications"></i>

                            Applications

                        </span>


                        <span>

                            <i className="legend-dot selected"></i>

                            Selected

                        </span>

                    </div>

                </section>


                {/* UPCOMING DEADLINES */}

                <section className="dashboard-panel">

                    <div className="panel-heading">

                        <div>

                            <h2>
                                Upcoming Deadlines
                            </h2>

                            <p>
                                Don't miss these opportunities
                            </p>

                        </div>

                        <Link to="/jobs">
                            View All
                        </Link>

                    </div>


                    <div className="deadline-list">

                        {jobs
                            .slice(0, 4)
                            .map((job) => (

                                <div
                                    className="deadline-item"
                                    key={job.id}
                                >

                                    <div className="deadline-company-logo">
                                        {job.logo}
                                    </div>


                                    <div className="deadline-info">

                                        <strong>
                                            {job.company}
                                        </strong>

                                        <span>
                                            {job.position}
                                        </span>

                                        <small>
                                            Deadline: {job.deadline}
                                        </small>

                                    </div>


                                    <Link
                                        to={`/jobs/${job.id}`}
                                        className="deadline-view"
                                    >
                                        View
                                    </Link>

                                </div>

                            ))}

                    </div>


                    <Link
                        to="/jobs"
                        className="outline-button full-button"
                    >
                        View All Opportunities
                    </Link>

                </section>

            </div>


            {/* ================================
                LOWER SECTION
            ================================= */}

            <div className="dashboard-grid lower-grid">


                {/* LATEST OPPORTUNITIES */}

                <section className="dashboard-panel">

                    <div className="panel-heading">

                        <div>

                            <h2>
                                Latest Opportunities
                            </h2>

                            <p>
                                Recently added placement jobs
                            </p>

                        </div>

                        <Link to="/jobs">
                            View All
                        </Link>

                    </div>


                    <div className="recent-application-list">

                        {latestJobs.map((job) => (

                            <div
                                className="recent-application"
                                key={job.id}
                            >

                                <div className="company-logo">
                                    {job.logo}
                                </div>


                                <div className="recent-application-info">

                                    <strong>
                                        {job.position}
                                    </strong>

                                    <span>
                                        {job.company} • {job.location}
                                    </span>

                                </div>


                                <strong className="mini-salary">
                                    {job.package}
                                </strong>

                            </div>

                        ))}

                    </div>

                </section>


                {/* RECENT UPDATES */}

                <section className="dashboard-panel">

                    <div className="panel-heading">

                        <div>

                            <h2>
                                Recent Updates
                            </h2>

                            <p>
                                Latest placement notifications
                            </p>

                        </div>

                        <Link to="/notifications">
                            View All
                        </Link>

                    </div>


                    <div className="recent-notifications">

                        {notifications
                            .slice(0, 3)
                            .map((notification) => (

                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                />

                            ))}

                    </div>

                </section>

            </div>

        </div>
    );
}

export default Dashboard;