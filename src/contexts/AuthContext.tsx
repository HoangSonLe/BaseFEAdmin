import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

// Define user type
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => false,
  logout: () => {},
  forgotPassword: async () => false,
  resetPassword: async () => false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (token) {
          // In a real app, you would validate the token with your backend
          // For now, we'll just simulate a user
          const userData: User = {
            id: "1",
            email: "user@example.com",
            name: "Admin User",
            role: "admin",
          };
          setUser(userData);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        localStorage.removeItem("authToken");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, you would call your API here
      // For now, we'll just simulate a successful login with any credentials
      if (email && password) {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Mock successful login
        const userData: User = {
          id: "1",
          email,
          name: "Admin User",
          role: "admin",
        };
        
        // Store token in localStorage
        localStorage.setItem("authToken", "mock-jwt-token");
        
        // Update state
        setUser(userData);
        message.success("Login successful");
        return true;
      }
      message.error("Invalid credentials");
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    message.success("Logged out successfully");
    navigate("/login");
  };

  // Forgot password function
  const forgotPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, you would call your API here
      // For now, we'll just simulate a successful request
      if (email) {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        message.success("Password reset instructions sent to your email");
        return true;
      }
      message.error("Please enter a valid email");
      return false;
    } catch (error) {
      console.error("Forgot password request failed:", error);
      message.error("Request failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // In a real app, you would call your API here
      // For now, we'll just simulate a successful request
      if (token && newPassword) {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        message.success("Password has been reset successfully");
        return true;
      }
      message.error("Invalid request");
      return false;
    } catch (error) {
      console.error("Reset password failed:", error);
      message.error("Password reset failed. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
