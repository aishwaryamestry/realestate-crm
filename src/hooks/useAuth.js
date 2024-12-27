import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Adjust the path based on where your context file is

const useAuth = () => {
  const { authState } = useContext(AuthContext);

  return {
    isAuthenticated: !!authState.token, // Check if token exists
    userRole: authState.user?.role, // Role from context (added optional chaining)
  };
};

export default useAuth;
