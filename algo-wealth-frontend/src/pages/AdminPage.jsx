import { logout } from "../utils/authUtil";

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>
      <p>Only users with admin privileges can see this page.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}