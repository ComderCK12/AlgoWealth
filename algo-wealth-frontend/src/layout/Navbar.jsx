import "../styles/navbar.css";

export default function Navbar({ collapsed, setMobileOpen, mobileOpen }) {
  return (
    <header className={`navbar ${collapsed ? "collapsed" : ""}`}>
      
      {/* <span className="hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
        ☰
      </span> */}

      <h2 className="nav-title">Dashboard</h2>

      {/* <div className="nav-right">
        <span className="nav-email">user@example.com</span>
        <img src="/user.png" className="nav-avatar" />
      </div> */}
    </header>
  );
}