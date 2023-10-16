import React from "react";
import axios from "axios";

const AuthContext = React.createContext();

import env_config from "../config/env_config";

const AuthProvider = ({ children }) => {
  const API_ENDPOINT = env_config.VITE_API_ENDPOINTS;

  const [auth, setAuth] = React.useState({
    user: null,
    token: "",
  });

  // default headers
  // React.useEffect(() => {
  //   axios.defaults.headers.common["Authorization"] = auth?.token;
  // }, [auth.token]);

  React.useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parse = JSON.parse(data);
      setAuth({
        ...auth,
        user: parse.user,
        token: parse.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth, API_ENDPOINT]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthProvider };
