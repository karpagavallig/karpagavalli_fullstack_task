import { NavLink } from "react-router-dom";
import { usePlacement } from "../context/PlacementContext";

function Sidebar({ open, closeSidebar }) {
    const { user } = usePlacement();

    const menuItems = [
        { path: "/dashboard", icon: "⌂", label: "Dashboard" },
        { path: "/jobs", icon: "💼", label: "Job Openings" },
        { path: "/applications", icon: "▣", label: "My Applications" },
        { path: "/interviews", icon: "◷", label: "Interviews" },
        { path: "/notifications", icon: "♢", label: "Notifications" },
        { path: "/profile", icon: "♙", label: "My Profile" },
    ];

    return (
        <>
            {open && (
                <div
                    className="sidebar-overlay"
                    onClick={closeSidebar}
                ></div>
            )}

            <aside
                className={`sidebar ${
                    open ? "sidebar-open" : ""
                }`}
            >
                <div className="brand">
                    <div className="brand-logo">P</div>

                    <div>
                        <h2>PlaceMate</h2>
                        <span>Career Portal</span>
                    </div>
                </div>

                <div className="student-mini">
                    <div className="student-avatar">
                        {user?.name?.charAt(0)?.toUpperCase() ||
                            "S"}
                    </div>

                    <div>
                        <strong>
                            {user?.name || "Student"}
                        </strong>

                        <span>
                            {user?.department || "Student"}
                        </span>
                    </div>
                </div>

                <p className="menu-title">MAIN MENU</p>

                <nav className="sidebar-nav">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                isActive
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-help">
                    <div className="help-icon">?</div>

                    <div className="help-content">
                        <strong>Need Help?</strong>

                        <p>Contact Placement Cell</p>

                        <a href="tel:+914412345678">
                            +91 44 1234 5678
                        </a>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;