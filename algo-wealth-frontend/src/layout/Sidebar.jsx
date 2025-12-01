import { useState } from "react";
import {
  MdDashboard,
  MdAccountBalanceWallet,
  MdCalculate,
  MdCreditScore,
  MdArticle,
  MdNewReleases,
  MdSettings
} from "react-icons/md";
import { Link } from "react-router-dom";

import "../styles/sidebar.css";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  
  const menuItems = [
  { label: "Dashboard", icon: <MdDashboard />, path: "/dashboard" },
  { label: "Net Worth", icon: <MdAccountBalanceWallet />, path: "/networth" },
  { label: "Tax Calculator", icon: <MdCalculate />, path: "/tax" },
  { label: "Credit Score", icon: <MdCreditScore />, path: "/credit-score" },
  { label: "Blogs", icon: <MdArticle />, path: "/blogs" },
  { label: "News", icon: <MdNewReleases />, path: "/news" },
  { label: "Settings", icon: <MdSettings />, path: "/settings" },
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
          <li key={i}>
            <Link to={item.path}>
              {item.icon}
              {!collapsed && <span>{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
