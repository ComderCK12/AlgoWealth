import { useEffect, useState } from "react";
import "../styles/networth.css";

export default function NetWorth() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newEntry, setNewEntry] = useState({
    entryType: "ASSET",
    category: "",
    description: "",
    amount: "",
  });

  const token = localStorage.getItem("token");

  // ----------------------
  // Fetch Summary
  // ----------------------
  async function fetchSummary() {
    try {
      const res = await fetch("http://localhost:8080/api/networth", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Forbidden or unauthorized");

      const data = await res.json();
      setSummary(data);
    } catch (err) {
      console.error("Error fetching summary:", err);
    } finally {
      setLoading(false);
    }
  }

  // ----------------------
  // Add Entry
  // ----------------------
  async function addEntry(e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/networth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newEntry),
      });

      if (!res.ok) throw new Error("Failed to add entry");

      setNewEntry({ entryType: "ASSET", category: "", description: "", amount: "" });

      fetchSummary(); // refresh
    } catch (err) {
      console.error(err);
    }
  }

  // ----------------------
  // Delete Entry
  // ----------------------
  async function deleteEntry(id) {
    try {
      await fetch(`http://localhost:8080/api/networth/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchSummary();
    } catch (err) {
      console.error(err);
    }
  }

  // Load data on mount
  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) return <p className="loading-text">Loading your net worth...</p>;
  if (!summary) return <p className="loading-text">Unable to load data</p>;

  return (
    <div className="networth-page">

      <h1 className="page-title">Net Worth Tracker</h1>
      <p className="page-subtitle">Understand your financial position clearly</p>

      {/* Summary Boxes */}
      <div className="summary-grid">
        <div className="summary-card assets">
          <h3>Total Assets</h3>
          <p>₹ {summary.totalAssets}</p>
        </div>

        <div className="summary-card liabilities">
          <h3>Total Liabilities</h3>
          <p>₹ {summary.totalLiabilities}</p>
        </div>

        <div className="summary-card networth">
          <h3>Net Worth</h3>
          <p>₹ {summary.netWorth}</p>
        </div>
      </div>

      {/* Add Entry Form */}
      <form className="entry-form" onSubmit={addEntry}>
        <h2>Add Entry</h2>

        <select
          value={newEntry.entryType}
          onChange={(e) => setNewEntry({ ...newEntry, entryType: e.target.value })}
        >
          <option value="ASSET">Asset</option>
          <option value="LIABILITY">Liability</option>
        </select>

        <input
          type="text"
          placeholder="Category"
          value={newEntry.category}
          onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Description"
          value={newEntry.description}
          onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
        />

        <input
          type="number"
          placeholder="Amount"
          value={newEntry.amount}
          onChange={(e) => setNewEntry({ ...newEntry, amount: e.target.value })}
          required
        />

        <button type="submit" className="btn-add">Add</button>
      </form>

      {/* Entries List */}
      <div className="entries-list">
        <h2>Your Entries</h2>

        {summary.entries.length === 0 ? (
          <p className="no-data">No entries added yet</p>
        ) : (
          summary.entries.map((e) => (
            <div key={e.id} className="entry-row">
              <span className={`entry-type ${e.entryType.toLowerCase()}`}>
                {e.entryType}
              </span>
              <span>{e.category}</span>
              <span>{e.description || "-"}</span>
              <span>₹ {e.amount}</span>

              <button className="delete-btn" onClick={() => deleteEntry(e.id)}>
                ✖
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
