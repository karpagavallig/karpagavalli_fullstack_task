import React, { useState } from "react";

function LoginForm() {
  // State variables requested in the prompt
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  // Message state to display login feedback
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Check if both username and password are provided
    if (username.trim() !== "" && password.trim() !== "") {
      setMessage("Login Successful");
    } else {
      setMessage("Please enter username and password");
    }
  };

  return (
    <div className="card shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: "420px" }}>
      <div className="card-header bg-primary text-white text-center py-3 rounded-top-4">
        <h4 className="m-0 fw-bold">Login Form</h4>
      </div>

      <div className="card-body p-4">
        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold text-secondary">Username:</label>
            <input
              type="text"
              className="form-control form-control-lg fs-6 rounded-3"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4 text-start">
            <label className="form-label fw-semibold text-secondary">Password:</label>
            <input
              type="password"
              className="form-control form-control-lg fs-6 rounded-3"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary btn-lg rounded-pill fw-bold shadow-sm">
              [ Login ]
            </button>
          </div>
        </form>

        {/* Feedback Message Banner */}
        {message && (
          <div
            className={`alert ${
              message === "Login Successful" ? "alert-success" : "alert-danger"
            } mb-0 mt-3 text-center fw-bold rounded-3`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;