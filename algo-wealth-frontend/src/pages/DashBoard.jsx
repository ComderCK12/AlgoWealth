import { useEffect, useState } from "react";
import { getRoles } from "../utils/authUtil";
import "../styles/dashboard.css";

export default function DashBoard() {
  const roles = getRoles();

  // Multiple typewriter texts
  const texts = [
    "Welcome to your dashboard 👋",
    "Analyzing your finances...",
    "Optimizing your investments...",
    "Smart insights loading..."
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let speed = isDeleting ? 20  : 60;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setTypedText(currentText.substring(0, typedText.length + 1));

        if (typedText.length + 1 === currentText.length) {
          // Pause and start deleting
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        // Deleting
        setTypedText(currentText.substring(0, typedText.length - 1));

        if (typedText.length === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, textIndex]);

  // Demo values
  const totalAssets = 42500;
  const monthlyGains = 8.14;
  const riskScore = "Moderate";

  const riskColorClass = {
    Excellent: "risk-excellent",
    Moderate: "risk-moderate",
    Risky: "risk-risky",
  }[riskScore];

  const gainsClass =
    monthlyGains > 0
      ? "gain-positive"
      : monthlyGains < 0
      ? "gain-negative"
      : "gain-neutral";

  return (
    <div className="dashboard-page">

      {/* Multi-typewriter */}
      <h1 className="welcome typewriter">{typedText}</h1>

      <p className="tagline">Smart decisions begin here.</p>

      <div className="stats-grid">
        <div className="card assets-card">
          <h3>Total Assets</h3>
          <p>${totalAssets.toLocaleString()}</p>
        </div>

        <div className={`card monthly-card ${gainsClass}`}>
          <h3>Monthly Gains</h3>
          <p>{monthlyGains > 0 ? "+" : ""}{monthlyGains}%</p>
        </div>

        <div className={`card risk-card ${riskColorClass}`}>
          <h3>Risk Score</h3>
          <p>{riskScore}</p>
        </div>
      </div>

      <div className="roles-box">
        <h3>Your Roles</h3>
        <p>{roles.join(", ")}</p>
      </div>
    </div>
  );
}
