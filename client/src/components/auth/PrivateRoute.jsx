import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function PrivateRoute({ children }) {
  const { authState } = useAuth();

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
