import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

/*
  ProtectedRoute is used to:
  - Block unauthenticated users
  - Optionally block users without required role (ex: admin)
*/
const ProtectedRoute = ({ children, role }) => {
  // Get logged-in user from Redux
  const { user } = useSelector((state) => state.auth);

  // Store current route so we can redirect back after login
  const location = useLocation();

  // If user is not logged in, redirect to login page
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // If role is specified and user role does not match
  if (role && user.role !== role) {
    // Redirect unauthorized users to home page
    return <Navigate to="/" replace />;
  }

  // Authorized → render protected content
  return children;
};

export default ProtectedRoute;
