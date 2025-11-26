import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/layout.css";

export default function AppLayout({ children }) {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-area">
        <Navbar />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
}
