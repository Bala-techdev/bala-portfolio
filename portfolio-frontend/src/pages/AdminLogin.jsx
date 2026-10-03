import { useState } from "react";
import "./AdminLogin.css";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const data = await response.json();

      localStorage.setItem("admin_token", data.accessToken);

      onLogin();
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <h1>Admin Login</h1>
        <p>Sign in to manage your portfolio.</p>

        <form onSubmit={handleSubmit}>
          <label>Username</label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
            autoComplete="username"
          />

          <label>Password</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            autoComplete="current-password"
          />

          {error && <div className="admin-login-error">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <button
          type="button"
          className="admin-back"
          onClick={() => {
            window.location.hash = "/";
          }}
        >
          ← Back to Portfolio
        </button>
      </div>
    </div>
  );
}