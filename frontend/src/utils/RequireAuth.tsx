import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
interface AuthProps {
  redirectTo: string;
  children: JSX.Element;
}

const RequireAuth = ({ children, redirectTo }: AuthProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
};
export default RequireAuth;
