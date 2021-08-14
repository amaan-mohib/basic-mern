import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../config";
import { useAuth } from "../contexts/AuthContext";
import { useDiscuss } from "../contexts/DiscussionContext";

const Header = () => {
  const { user } = useAuth();
  return <div className="header">{user ? <PostForm /> : <Login />}</div>;
};

const Login = () => {
  return (
    <div className="header-div">
      <h2>Login to create a discussion</h2>
      <Link to="/login" style={{ textDecoration: "none" }}>
        <button className="button">Login</button>
      </Link>
    </div>
  );
};
const PostForm = () => {
  const [topic, setTopic] = useState("");
  const [desc, setDesc] = useState("");
  const { user, logout } = useAuth();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const { setData } = useDiscuss();

  const validation = () => {
    if (topic.trim() === "" || desc.trim() === "") return false;
    else return true;
  };
  const post = () => {
    if (validation()) {
      setError("");
      const config = {
        topic: topic,
        desc: desc,
        author: {
          displayName: user.displayName,
          email: user.email,
          userid: user._id,
        },
      };
      axios
        .post(`${API}/post/`, config)
        .then((res) => {
          setTopic("");
          setDesc("");
          setShow(true);
          setData((d) => [config, ...d]);
          setTimeout(() => {
            setShow(false);
          }, 1500);
        })
        .catch((err) => {
          console.error(err);
          setError(err.response.data);
        });
    } else {
      setError("All fields are required");
    }
  };

  return (
    <div className="header-div">
      <h2>Post a discussion</h2>
      <input
        type="text"
        placeholder="Topic"
        title="Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <textarea
        rows="5"
        placeholder="Description"
        title="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <button className="button" onClick={post}>
          Submit
        </button>
        <button className="button" onClick={logout}>
          Log Out
        </button>
      </div>
      {show && <span>Discussion submitted</span>}
      {error !== "" && <span className="error">{error}</span>}
    </div>
  );
};

export default Header;
