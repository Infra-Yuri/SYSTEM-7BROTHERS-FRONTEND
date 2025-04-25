import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem('token');
  const cargo = localStorage.getItem('cargo');
  if (!token) return <Navigate to="/login" />;
  if (role && cargo !== role) return <Navigate to="/" />;
  return children;
}
