import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [userType, setUserType] = useState(localStorage.getItem("userType"));

  // 1. Get the user data string from storage
  const storedUser = localStorage.getItem("user");

  // 2. Check if it's a valid string *before* parsing
  //    (We also check for the literal string "undefined", which can be saved by mistake)
  const initialUser =
    storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null;

  // 3. Set the initial state safely
  const [user, setUser] = useState(initialUser);

  const login = (type, userData) => {
    setIsLoggedIn(true);
    setUserType(type);
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserType(null);
    setUser(null);
    window.location.href = "/";
  };

  const value = {
    isLoggedIn,
    login,
    logout,
    userType,
    user,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
