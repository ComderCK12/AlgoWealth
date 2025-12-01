import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import AppLayout from "./layout/AppLayout";
import NetWorth from "./pages/NetWorth";
import TaxCalculator from "./pages/TaxCalculator";
import CreditScore from "./pages/CreditScore";
import Blogs from "./pages/Blogs";
import News from "./pages/News";
import Settings from "./pages/Settings";  


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected User Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <DashBoard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/networth"
          element={
            <ProtectedRoute>
              <AppLayout>
                <NetWorth />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tax"
          element={
            <ProtectedRoute>
              <AppLayout>
                <TaxCalculator />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/credit-score"
          element={
            <ProtectedRoute>
              <AppLayout>
                <CreditScore />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/blogs"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Blogs />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <AppLayout>
                <News />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Settings />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AppLayout>
                <AdminPage />
              </AppLayout>
            </AdminRoute>
          }
        />

        <Route path="/not-authorized" element={<h2>Not Authorized</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
