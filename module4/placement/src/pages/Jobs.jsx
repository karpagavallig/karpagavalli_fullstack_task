import { useMemo, useState } from "react";
import JobCard from "../component/JobCard";
import { usePlacement } from "../context/PlacementContext";

function Jobs() {
    const { jobs } = usePlacement();

    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("All");
    const [sort, setSort] = useState("default");

    const locations = [
        "All",
        ...new Set(jobs.map((job) => job.location)),
    ];

    const filteredJobs = useMemo(() => {
        let result = jobs.filter((job) => {
            const searchText = search
                .toLowerCase()
                .trim();

            const searchMatch =
                searchText === "" ||
                job.company
                    .toLowerCase()
                    .includes(searchText) ||
                job.position
                    .toLowerCase()
                    .includes(searchText) ||
                job.skills.some((skill) =>
                    skill
                        .toLowerCase()
                        .includes(searchText)
                );

            const locationMatch =
                location === "All" ||
                job.location === location;

            return searchMatch && locationMatch;
        });

        if (sort === "package-high") {
            result = [...result].sort((a, b) => {
                const packageA = parseFloat(
                    a.package.replace(/[^\d.]/g, "")
                );

                const packageB = parseFloat(
                    b.package.replace(/[^\d.]/g, "")
                );

                return packageB - packageA;
            });
        }

        if (sort === "package-low") {
            result = [...result].sort((a, b) => {
                const packageA = parseFloat(
                    a.package.replace(/[^\d.]/g, "")
                );

                const packageB = parseFloat(
                    b.package.replace(/[^\d.]/g, "")
                );

                return packageA - packageB;
            });
        }

        if (sort === "deadline") {
            result = [...result].sort(
                (a, b) =>
                    new Date(a.deadline) -
                    new Date(b.deadline)
            );
        }

        return result;
    }, [jobs, search, location, sort]);

    const clearFilters = () => {
        setSearch("");
        setLocation("All");
        setSort("default");
    };

    const hasFilters =
        search.trim() !== "" ||
        location !== "All" ||
        sort !== "default";

    return (
        <div className="page-container">
            {/* Page Header */}
            <div className="page-header">
                <div>
                    <span className="page-eyebrow">
                        OPPORTUNITIES
                    </span>

                    <h1>Job Openings</h1>

                    <p>
                        Discover your next career opportunity
                        from leading companies.
                    </p>
                </div>

                <div className="job-count">
                    <strong>
                        {filteredJobs.length}
                    </strong>

                    <span>
                        {filteredJobs.length === 1
                            ? "Open Position"
                            : "Open Positions"}
                    </span>
                </div>
            </div>

            {/* Filters */}
            <div className="filter-panel">
                <div className="search-box">
                    <span>⌕</span>

                    <input
                        type="text"
                        placeholder="Search company, role or skill..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />
                </div>

                <select
                    value={location}
                    onChange={(e) =>
                        setLocation(e.target.value)
                    }
                >
                    {locations.map((item) => (
                        <option
                            key={item}
                            value={item}
                        >
                            {item === "All"
                                ? "All Locations"
                                : item}
                        </option>
                    ))}
                </select>

                <select
                    value={sort}
                    onChange={(e) =>
                        setSort(e.target.value)
                    }
                >
                    <option value="default">
                        Sort By
                    </option>

                    <option value="package-high">
                        Highest Package
                    </option>

                    <option value="package-low">
                        Lowest Package
                    </option>

                    <option value="deadline">
                        Closing Soon
                    </option>
                </select>

                {hasFilters && (
                    <button
                        type="button"
                        className="clear-filter-button"
                        onClick={clearFilters}
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Results */}
            {filteredJobs.length > 0 ? (
                <>
                    <div className="results-summary">
                        <span>
                            Showing{" "}
                            <strong>
                                {filteredJobs.length}
                            </strong>{" "}
                            opportunities
                        </span>

                        {search && (
                            <span>
                                Search:{" "}
                                <strong>
                                    "{search}"
                                </strong>
                            </span>
                        )}
                    </div>

                    <div className="jobs-grid">
                        {filteredJobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <div className="empty-state">
                    <div>⌕</div>

                    <h2>No Jobs Found</h2>

                    <p>
                        We couldn't find any opportunities
                        matching your search criteria.
                    </p>

                    <button
                        type="button"
                        className="outline-button"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    );
}

export default Jobs;