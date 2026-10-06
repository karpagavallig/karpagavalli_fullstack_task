import { Link } from "react-router-dom";
import { usePlacement } from "../context/PlacementContext";

function Navbar({ onMenuClick }) {
    const { user, applications } = usePlacement();

    const firstLetter =
        user?.name?.charAt(0)?.toUpperCase() || "S";

    return (
        <header className="navbar">
            <div className="navbar-left">
                <button
                    type="button"
                    className="mobile-menu"
                    onClick={onMenuClick}
                    aria-label="Open navigation menu"
                >
                    ☰
                </button>

                <div className="navbar-heading">
                    <div className="breadcrumb">
                        Student Portal
                    </div>

                    <div className="page-title">
                        Placement Management
                    </div>
                </div>
            </div>

            <div className="navbar-right">
                <Link
                    to="/notifications"
                    className="notification-button"
                    aria-label="View notifications"
                >
                    🔔

                    <span className="notification-dot"></span>
                </Link>

                <Link
                    to="/profile"
                    className="user-mini"
                >
                    <div className="avatar">
                        {firstLetter}
                    </div>

                    <div className="user-mini-info">
                        <strong>
                            {user?.name || "Student"}
                        </strong>

                        <small>
                            {user?.department ||
                                "Student"}
                        </small>
                    </div>

                    <span className="user-chevron">
                        ▾
                    </span>
                </Link>
            </div>
        </header>
    );
}

export default Navbar;