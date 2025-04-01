import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
export function ProtectedRoute()  {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
