import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { usePlacement } from "../context/PlacementContext";

function Register() {
    const { user, register } = usePlacement();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        registerNo: "",
        email: "",
        department: "",
        cgpa: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] =
        useState(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState(false);

    /*
     * If already logged in, always go to Dashboard.
     */
    if (user) {
        return (
            <Navigate
                to="/dashboard"
                replace
            />
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setError("");

        if (
            !form.name.trim() ||
            !form.registerNo.trim() ||
            !form.email.trim() ||
            !form.department.trim() ||
            !form.cgpa ||
            !form.password ||
            !form.confirmPassword
        ) {
            setError(
                "Please fill in all required fields."
            );

            return;
        }

        const cgpaValue = Number(form.cgpa);

        if (
            Number.isNaN(cgpaValue) ||
            cgpaValue < 0 ||
            cgpaValue > 10
        ) {
            setError(
                "CGPA must be between 0 and 10."
            );

            return;
        }

        if (form.password.length < 6) {
            setError(
                "Password must contain at least 6 characters."
            );

            return;
        }

        if (
            form.password !==
            form.confirmPassword
        ) {
            setError(
                "Passwords do not match."
            );

            return;
        }

        setLoading(true);

        setTimeout(() => {
            const result = register({
                name: form.name.trim(),
                registerNo:
                    form.registerNo.trim(),
                email: form.email.trim(),
                department:
                    form.department.trim(),
                cgpa: form.cgpa,
                password: form.password,
                confirmPassword:
                    form.confirmPassword,
            });

            setLoading(false);

            if (result.success) {
                /*
                 * IMPORTANT:
                 * Registration does NOT log in automatically.
                 *
                 * Go to Sign In page.
                 */
                navigate("/", {
                    replace: true,
                    state: {
                        message:
                            "Account created successfully. Please sign in.",
                    },
                });
            } else {
                setError(result.message);
            }
        }, 400);
    };

    return (
        <div className="auth-page">
            {/* LEFT BRAND SECTION */}
            <section className="auth-brand-side">
                <div className="auth-brand-content">
                    <div className="auth-brand-logo">
                        P
                    </div>

                    <span className="auth-label">
                        START YOUR JOURNEY
                    </span>

                    <h1>
                        Your next
                        <br />
                        <span>opportunity.</span>
                    </h1>

                    <p>
                        Create your student profile
                        and get started with your
                        placement journey. Discover
                        companies, apply for jobs,
                        and track your career
                        progress.
                    </p>

                    <div className="auth-features">
                        <div>
                            <span>✓</span>
                            <p>
                                Create your professional
                                student profile
                            </p>
                        </div>

                        <div>
                            <span>✓</span>
                            <p>
                                Find opportunities matching
                                your skills
                            </p>
                        </div>

                        <div>
                            <span>✓</span>
                            <p>
                                Track applications and
                                interviews easily
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* RIGHT REGISTER SECTION */}
            <section className="auth-form-side">
                <div className="auth-card register-card">
                    <div className="auth-header">
                        <span className="page-eyebrow">
                            CREATE ACCOUNT
                        </span>

                        <h2>
                            Join PlaceMate
                        </h2>

                        <p>
                            Enter your details to
                            create your student
                            placement account.
                        </p>
                    </div>

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <form
                        className="auth-form"
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
                                    value={form.name}
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter your full name"
                                    autoComplete="name"
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
                                    value={form.email}
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="student@example.com"
                                    autoComplete="email"
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
                                    placeholder="CSE - AIML"
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
                                    value={form.cgpa}
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="8.75"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">
                                    Password
                                </label>

                                <div
                                    style={{
                                        position:
                                            "relative",
                                    }}
                                >
                                    <input
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={
                                            form.password
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Minimum 6 characters"
                                        autoComplete="new-password"
                                        required
                                        style={{
                                            paddingRight:
                                                "75px",
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (
                                                    previous
                                                ) =>
                                                    !previous
                                            )
                                        }
                                        style={{
                                            position:
                                                "absolute",
                                            right: "8px",
                                            top: "50%",
                                            transform:
                                                "translateY(-50%)",
                                            border: "0",
                                            background:
                                                "transparent",
                                            color: "#756f82",
                                            fontSize:
                                                "10px",
                                            fontWeight:
                                                "700",
                                            padding:
                                                "7px",
                                        }}
                                    >
                                        {showPassword
                                            ? "HIDE"
                                            : "SHOW"}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword">
                                    Confirm Password
                                </label>

                                <div
                                    style={{
                                        position:
                                            "relative",
                                    }}
                                >
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={
                                            form.confirmPassword
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        placeholder="Re-enter password"
                                        autoComplete="new-password"
                                        required
                                        style={{
                                            paddingRight:
                                                "75px",
                                        }}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                (
                                                    previous
                                                ) =>
                                                    !previous
                                            )
                                        }
                                        style={{
                                            position:
                                                "absolute",
                                            right: "8px",
                                            top: "50%",
                                            transform:
                                                "translateY(-50%)",
                                            border: "0",
                                            background:
                                                "transparent",
                                            color: "#756f82",
                                            fontSize:
                                                "10px",
                                            fontWeight:
                                                "700",
                                            padding:
                                                "7px",
                                        }}
                                    >
                                        {showConfirmPassword
                                            ? "HIDE"
                                            : "SHOW"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account →"}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <span>
                            Already have an account?
                        </span>

                        <Link to="/">
                            Sign In
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Register;