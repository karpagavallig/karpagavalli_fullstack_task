import { useEffect, useState } from "react";

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                return response.json();
            })
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.username.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loader"></div>
                <h2>Loading Users...</h2>
                <p>Fetching user information from API</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-screen">
                <div className="error-icon">!</div>
                <h2>Unable to Load Users</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="page">

            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">
                    <div className="logo-icon">U</div>
                    <div>
                        <h2>UserHub</h2>
                        <span>API Dashboard</span>
                    </div>
                </div>

                <div className="nav-status">
                    <span className="status-dot"></span>
                    API Connected
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hero">
                <div>
                    <p className="small-title">USER MANAGEMENT</p>
                    <h1>Explore User Directory</h1>
                    <p className="hero-text">
                        User information retrieved dynamically using React,
                        useEffect and Fetch API.
                    </p>
                </div>

                <div className="hero-badge">
                    <span>●</span>
                    Live Data
                </div>
            </section>

            {/* Statistics */}
            <section className="stats">

                <div className="stat-card">
                    <div className="stat-icon purple">👥</div>
                    <div>
                        <span>Total Users</span>
                        <h2>{users.length}</h2>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon blue">✓</div>
                    <div>
                        <span>API Status</span>
                        <h2>Active</h2>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon green">@</div>
                    <div>
                        <span>Email Records</span>
                        <h2>{users.length}</h2>
                    </div>
                </div>

            </section>

            {/* Search */}
            <section className="content">

                <div className="section-header">
                    <div>
                        <h2>All Users</h2>
                        <p>Browse registered user information</p>
                    </div>

                    <div className="search-box">
                        <span>⌕</span>
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* User Cards */}
                <div className="user-grid">

                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <div className="user-card" key={user.id}>

                                <div className="card-top">
                                    <div className="avatar">
                                        {user.name.charAt(0)}
                                    </div>

                                    <div className="user-id">
                                        ID #{String(user.id).padStart(2, "0")}
                                    </div>
                                </div>

                                <div className="user-info">
                                    <h3>{user.name}</h3>

                                    <p className="username">
                                        @{user.username}
                                    </p>

                                    <div className="info-row">
                                        <span className="info-icon">✉</span>
                                        <span>{user.email}</span>
                                    </div>

                                    <div className="info-row">
                                        <span className="info-icon">⌂</span>
                                        <span>{user.address.city}</span>
                                    </div>

                                    <div className="info-row">
                                        <span className="info-icon">☎</span>
                                        <span>{user.phone}</span>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <span className="active-dot"></span>
                                    Active User
                                </div>

                            </div>
                        ))
                    ) : (
                        <div className="no-results">
                            <h3>No Users Found</h3>
                            <p>Try searching with another name or username.</p>
                        </div>
                    )}

                </div>

            </section>

            {/* Footer */}
            <footer>
                <p>
                    UserHub • React API Dashboard
                </p>

                <span>
                    Built with React + Fetch API
                </span>
            </footer>

        </div>
    );
}

export default Users;