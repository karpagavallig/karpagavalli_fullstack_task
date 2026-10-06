import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { usePlacement } from "../context/PlacementContext";

function Login() {
    const { user, login } = usePlacement();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    if (user) {
        return <Navigate to="/dashboard" replace />;
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

        if (!form.email.trim() || !form.password.trim()) {
            setError("Please enter your email and password.");
            return;
        }

        setLoading(true);

        setTimeout(() => {
            const result = login(
                form.email.trim(),
                form.password
            );

            setLoading(false);

            if (result.success) {
                navigate("/dashboard", { replace: true });
            } else {
                setError(result.message);
            }
        }, 400);
    };

    const fillDemoLogin = () => {
        setForm({
            email: "student@placement.com",
            password: "123456",
        });

        setError("");
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
                        STUDENT PLACEMENT PORTAL
                    </span>

                    <h1>
                        Build your
                        <br />
                        <span>career.</span>
                    </h1>

                    <p>
                        Discover placement opportunities, track
                        your applications, prepare for interviews,
                        and take the next step toward your dream
                        career.
                    </p>

                    <div className="auth-features">
                        <div>
                            <span>✓</span>
                            <p>Explore opportunities from leading companies</p>
                        </div>

                        <div>
                            <span>✓</span>
                            <p>Track every application in one place</p>
                        </div>

                        <div>
                            <span>✓</span>
                            <p>Stay updated with interviews and notifications</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* RIGHT LOGIN SECTION */}
            <section className="auth-form-side">
                <div className="auth-card">
                    <div className="auth-header">
                        <span className="page-eyebrow">
                            WELCOME BACK
                        </span>

                        <h2>Sign in to PlaceMate</h2>

                        <p>
                            Enter your credentials to access your
                            placement dashboard.
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
                        <div className="form-group">
                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="student@example.com"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <div className="password-label-row">
                                <label htmlFor="password">
                                    Password
                                </label>

                                <span>
                                    Secure login
                                </span>
                            </div>

                            <div
                                style={{
                                    position: "relative",
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
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    style={{
                                        paddingRight: "75px",
                                    }}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (previous) =>
                                                !previous
                                        )
                                    }
                                    style={{
                                        position: "absolute",
                                        right: "8px",
                                        top: "50%",
                                        transform:
                                            "translateY(-50%)",
                                        border: "0",
                                        background:
                                            "transparent",
                                        color: "#756f82",
                                        fontSize: "10px",
                                        fontWeight: "700",
                                        padding: "7px",
                                    }}
                                >
                                    {showPassword
                                        ? "HIDE"
                                        : "SHOW"}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign In →"}
                        </button>
                    </form>

                    <div className="demo-login">
                        <strong>
                            Demo Student Account
                        </strong>

                        <div>
                            <span>Email</span>
                            <code>
                                student@placement.com
                            </code>
                        </div>

                        <div>
                            <span>Password</span>
                            <code>123456</code>
                        </div>

                        <button
                            type="button"
                            className="outline-button"
                            onClick={fillDemoLogin}
                            style={{
                                width: "100%",
                                marginTop: "10px",
                                minHeight: "36px",
                            }}
                        >
                            Use Demo Account
                        </button>
                    </div>

                    <div className="auth-footer">
                        <span>
                            Don't have an account?
                        </span>

                        <Link to="/register">
                            Create Account
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Login;