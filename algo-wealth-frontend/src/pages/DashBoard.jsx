import { logout, getRoles } from "../utils/authUtil";
import "../styles/dashboard.css";

export default function DashBoard() {
  const roles = getRoles();

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="brand">Algo<span>Wealth</span></h2>

        <nav className="menu">
          <a className="menu-item active">🏠 Dashboard</a>
          <a className="menu-item">📈 Investments</a>
          <a className="menu-item">📊 Portfolio</a>
          <a className="menu-item">⚙ Settings</a>
        </nav>

        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>

      <main className="main-view">
        <h1 className="welcome">Welcome to your dashboard 👋</h1>
        <p className="tagline">Smart decisions begin here.</p>

        <div className="stats-grid">
          <div className="card">
            <h3>Total Assets</h3>
            <p>$42,500.00</p>
          </div>

          <div className="card">
            <h3>Monthly Gains</h3>
            <p>+8.14%</p>
          </div>

          <div className="card">
            <h3>Risk Score</h3>
            <p>Moderate</p>
          </div>
        </div>

        <div className="roles-box">
          <h3>Your Roles</h3>
          <p>{roles.join(", ")}</p>
        </div>
      </main>
    </div>
  );
}
