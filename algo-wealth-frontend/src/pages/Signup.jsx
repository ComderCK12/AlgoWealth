import "../styles/global.css";
import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }
    try {
      await axios.post("http://localhost:8080/auth/signup", { email, password });
      setMsg("Signup successful! Redirecting...");
      setTimeout(() => (window.location.href = "/login"), 900);
    } catch {
      setMsg("Email already exists");
    }
  };

  const googleSignup = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  }

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <h1 className="auth-title">Create <span>Account</span></h1>
        <p className="auth-sub">Join AlgoWealth today</p>

        {msg && <p className="auth-msg">{msg}</p>}

        <form onSubmit={handleSignup}>
  <input className="auth-input" type="email" placeholder="Email" />
  <input className="auth-input" type="password" placeholder="Password" />
  <input className="auth-input" type="password" placeholder="Confirm Password" />

  <button className="auth-btn">Sign Up</button>

  <div className="divider">OR</div>

  <button className="google-btn" onClick={googleSignup}>
    <img src="/google-icon.png" width="18" alt="google icon" />
    Continue with Google
  </button>
</form>


        <p className="auth-bottom">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
