import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Create context for authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: localStorage.getItem("token"),
  });
  const navigate = useNavigate(); // Use navigate inside AuthProvider

  // Check if the user is already authenticated on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuthState({ ...authState, user: JSON.parse(storedUser) });
    }
  }, []); // Only run once on mount

  // Login function - Now making an API call to json-server
  const login = async (username, password) => {
    try {
      // Fetch the user by username
      const response = await axios.get("http://localhost:5000/users", {
        params: { username },
      });

      // Check if a user with the given username exists
      if (response.data.length === 1) {
        const user = response.data[0]; // Get the user object

        // Compare the provided password with the stored password
        if (user.password === password) {
          const { id, role } = user;
          const token = "fake-jwt-token"; // Replace this with a real token in production

          // Save user data and token to localStorage
          const userData = { username, role, id };
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("token", token);

          // Update the context state
          setAuthState({ token, user: userData });

          // Navigate to the appropriate dashboard based on the user's role
          if (role === "admin") {
            toast.success("Login successful!");
            navigate("/admin");
          } else if (role === "tenant") {
            toast.success("Login successful!");
            navigate("/tenant-dashboard");
          }
        } else {
          // Password is incorrect
          toast.error("Invalid password");
        }
      } else {
        // User not found
        toast.error("User not found!");
      }
    } catch (error) {
      toast.error("No tenant found");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAuthState({ user: null, token: null });
    navigate("/"); // Redirect to login after logout
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
