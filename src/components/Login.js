import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { API } from "../config";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const { user, setUser, logout } = useAuth();

  const validation = () => {
    if (email.trim() === "" || password.trim() === "") return false;
    else return true;
  };

  const login = () => {
    if (validation()) {
      setError("");
      axios
        .post(
          `${API}/login`,
          {
            email: email,
            password: password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          //console.log(res);
          setSuccess(true);
          setUser(res.data);
          history.push("/");
        })
        .catch((err) => {
          console.log(err.response);
          setError(err.response.data);
        });
    } else {
      setError("All fields are required");
    }
  };

  return (
    <div className="main">
      <div className="header header-div">
        {user && (
          <span>
            Already logged in as&nbsp;<b>{user.displayName}</b>&nbsp;|&nbsp;
            <Link to="/login" onClick={logout}>
              Log Out
            </Link>
          </span>
        )}
        <h1>Login</h1>
        <input
          type="text"
          title="Email"
          placeholder="Username or E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          title="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" onClick={login}>
          Login
        </button>
        {error !== "" && <span className="error">{error}</span>}
        {success && <span>Logging in</span>}
        <Link to="/register">Create new account</Link>
        <Link to="/">&lt; Home</Link>
      </div>
    </div>
  );
};

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  const validation = () => {
    if (email.trim() === "" || password.trim() === "" || name.trim() === "")
      return false;
    else return true;
  };

  const register = () => {
    if (validation()) {
      setError("");
      axios
        .post(
          `${API}/register`,
          {
            displayName: name,
            email: email,
            password: password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          //console.log(res);
          setSuccess(true);
          history.push("/login");
        })
        .catch((err) => {
          console.log(err.response);
          setError(err.response.data);
        });
    } else {
      setError("All fields are required");
    }
  };

  return (
    <div className="main">
      <div className="header header-div">
        <h1>Register</h1>
        <input
          type="text"
          placeholder="Full Name"
          title="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Username or E-mail"
          value={email}
          title="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          title="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" onClick={register}>
          Register
        </button>
        {error !== "" && <span className="error">{error}</span>}
        {success && <span>User created</span>}
        <span>
          Already a member?&nbsp;<Link to="/login">Login</Link>
        </span>
        <Link to="/">&lt; Home</Link>
      </div>
    </div>
  );
};

export default Login;
