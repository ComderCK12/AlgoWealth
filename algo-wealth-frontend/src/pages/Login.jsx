import "../styles/global.css";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch {
      setMsg("Invalid email or password");
    }
  };

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h1 className="auth-title">
          Algo<span>Wealth</span>
        </h1>
        <p className="auth-sub">Smart finance begins here</p>

        {msg && <p className="auth-msg">{msg}</p>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-btn">Login</button>
        </form>

        <div className="divider">OR</div>

        <button
          className="google-btn"
          onClick={() =>
            (window.location.href =
              "http://localhost:8080/oauth2/authorization/google")
          }
        >
          <img src="/google-icon.png" width="18" alt="google icon" />
          Continue with Google
        </button>

        <p className="auth-bottom">
          Don't have an account? <a href="/signup">Register</a>
        </p>
      </div>
    </div>
  );
}
