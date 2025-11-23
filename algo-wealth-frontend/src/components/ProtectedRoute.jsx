import {Navigate, Outlet} from 'react-router-dom';
import { isLoggedIn } from '../utils/authUtil';

export default function ProtectedRoute({children}) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}
