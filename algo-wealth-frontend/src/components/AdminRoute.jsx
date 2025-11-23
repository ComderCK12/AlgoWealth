import {Navigate, Outlet} from 'react-router-dom';
import { hasRole, isLoggedIn } from '../utils/authUtil';

const ADMIN_ROLE = 'ROLE_ADMIN';

export default function AdminRoute({children}) {
  return isLoggedIn() && hasRole(ADMIN_ROLE) ? children : <Navigate to="/not-authorised" replace />
}