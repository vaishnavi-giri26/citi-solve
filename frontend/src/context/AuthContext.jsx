import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const getStoredUser = () => {
    const stored = localStorage.getItem("user");

    if (!stored || stored === "undefined") {
      return null;
    }

    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error("Invalid user in localStorage:", error);
      return null;
    }
  };

  const [user, setUser] = useState(getStoredUser);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};