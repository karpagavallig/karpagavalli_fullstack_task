import { useState } from "react";
import { usePlacement } from "../context/PlacementContext";

function Profile() {
    const {
        user,
        updateProfile,
        logout,
    } = usePlacement();

    const [form, setForm] = useState({
        name: user?.name || "",
        registerNo: user?.registerNo || "",
        email: user?.email || "",
        department: user?.department || "",
        cgpa: user?.cgpa || "",
    });

    const [message, setMessage] =
        useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setMessage("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        updateProfile({
            ...user,
            ...form,
        });

        setMessage(
            "Profile updated successfully."
        );
    };

    const handleLogout = () => {
        logout();
    };

    const firstLetter =
        user?.name
            ?.charAt(0)
            ?.toUpperCase() || "S";

    return (
        <div className="page-container">
            <div className="page-header">
                <div>
                    <span className="page-eyebrow">
                        STUDENT ACCOUNT
                    </span>

                    <h1>My Profile</h1>

                    <p>
                        Manage your personal and
                        academic information.
                    </p>
                </div>
            </div>

            <div className="profile-grid">
                <section className="dashboard-panel profile-card">
                    <div className="profile-avatar">
                        {firstLetter}
                    </div>

                    <h2>
                        {user?.name ||
                            "Student"}
                    </h2>

                    <p>
                        {user?.department ||
                            "Student"}
                    </p>

                    <span className="profile-role">
                        Student
                    </span>

                    <div className="profile-stats">
                        <div>
                            <strong>
                                {user?.registerNo ||
                                    "-"}
                            </strong>

                            <span>
                                Register No.
                            </span>
                        </div>

                        <div>
                            <strong>
                                {user?.cgpa ||
                                    "-"}
                            </strong>

                            <span>
                                CGPA
                            </span>
                        </div>

                        <div>
                            <strong>
                                UG
                            </strong>

                            <span>
                                Program
                            </span>
                        </div>
                    </div>
                </section>

                <section className="dashboard-panel profile-form-panel">
                    <div className="panel-heading">
                        <div>
                            <h2>
                                Personal Information
                            </h2>

                            <p>
                                Update your personal
                                and academic details.
                            </p>
                        </div>
                    </div>

                    {message && (
                        <div className="success-message">
                            ✓ {message}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                    >
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="name">
                                    Full Name
                                </label>

                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={
                                        form.name
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="registerNo">
                                    Register Number
                                </label>

                                <input
                                    id="registerNo"
                                    name="registerNo"
                                    type="text"
                                    value={
                                        form.registerNo
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter register number"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">
                                    Email Address
                                </label>

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={
                                        form.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter email address"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="department">
                                    Department
                                </label>

                                <input
                                    id="department"
                                    name="department"
                                    type="text"
                                    value={
                                        form.department
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter department"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="cgpa">
                                    CGPA
                                </label>

                                <input
                                    id="cgpa"
                                    name="cgpa"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="10"
                                    value={
                                        form.cgpa
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter CGPA"
                                    required
                                />
                            </div>
                        </div>

                        <div className="profile-form-actions">
                            <button
                                type="submit"
                                className="primary-button"
                            >
                                Save Changes
                            </button>

                            <button
                                type="button"
                                className="outline-button"
                                onClick={
                                    handleLogout
                                }
                                style={{
                                    marginLeft:
                                        "10px",
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default Profile;