import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from "../config";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [user, changeUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`${API}/user`, { withCredentials: true })
      .then((res) => {
        if (res.data) {
          // console.log(res.data);
          changeUser(res.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  function setUser(user) {
    changeUser(user);
  }
  const logout = () => {
    axios.get(`${API}/logout`, { withCredentials: true }).then((res) => {
      // console.log(res.data);
      changeUser(null);
      history.replace("/");
    });
  };
  const value = {
    user,
    setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
