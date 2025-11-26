import { useState } from "react";
import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdCalculate,
  MdCreditScore,
  MdArticle,
  MdNewReleases
} from "react-icons/md";

import "../styles/sidebar.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { label: " Dashboard", icon: <MdDashboard /> },
    { label: " Net Worth", icon: <MdAccountBalanceWallet /> },
    { label: " Tax Calculator", icon: <MdCalculate /> },
    { label: " Credit Score", icon: <MdCreditScore /> },
    { label: " Blogs", icon: <MdArticle /> },
    { label: " News", icon: <MdNewReleases /> },
  ];

  return (
    <div className={collapsed ? "sidebar collapsed" : "sidebar"}>
      <div className="logo" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? (
          <span className="logo-small">
            <span className="logo-A">A</span>
            <span className="logo-W">W</span>
          </span>
        ) : (
          <span className="logo-full">
            Algo<span className="logo-W">Wealth</span>
          </span>
        )}
      </div>

      <ul className="menu">
        {menuItems.map((item, i) => (
          <li key={i} className="menu-item">
            {item.icon} 
            {!collapsed && <span>{item.label}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}
