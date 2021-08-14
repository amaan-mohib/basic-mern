import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { API } from "../config";
import { useAuth } from "../contexts/AuthContext";

const Discussion = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const history = useHistory();
  useEffect(() => {
    axios.get(`${API}/post/discussion/${id}`).then((res) => {
      //console.log(res);
      setData(res.data);
    }); // eslint-disable-next-line
  }, []);
  const deletePost = () => {
    axios
      .delete(`${API}/post/delete/${id}`)
      .then((res) => {
        //console.log(res);
        history.replace("/");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div className="main">
      <Link to="/" style={{ marginBottom: "20px" }}>
        &lt; Home
      </Link>
      {data ? (
        <>
          <div className="header discussion">
            <h1>{data.topic}</h1>
            <hr />
            <b>{data.author.displayName}</b>
            <p>{data.desc}</p>
            {user && user._id === data.author.userid && (
              <button
                className="button"
                style={{ marginTop: "20px" }}
                onClick={deletePost}>
                Delete Discussion
              </button>
            )}
          </div>

          <Comments id={id} />
        </>
      ) : (
        <h1>No discussion available</h1>
      )}
    </div>
  );
};

const Comments = ({ id }) => {
  const { user, logout } = useAuth();
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    axios.get(`${API}/post/discussion/comment/${id}`).then((res) => {
      //console.log(res);
      setData(res.data);
    }); // eslint-disable-next-line
  }, []);
  const post = () => {
    if (comment.trim() !== "") {
      setError("");
      const config = {
        postid: id,
        comment: comment,
        author: {
          displayName: user.displayName,
          email: user.email,
          userid: user._id,
        },
      };
      axios
        .post(`${API}/post/discussion/comment`, config)
        .then((res) => {
          setComment("");
          setShow(true);
          setTimeout(() => {
            setShow(false);
          }, 1500);
          setData((d) => [config, ...d]);
        })
        .catch((err) => {
          console.error(err);
          setError(err.response.data);
        });
    }
  };
  return (
    <>
      <h2>Comments&nbsp;({data.length})</h2>
      {!user && (
        <p style={{ margin: "10px 0" }}>
          <Link to="/login">Login</Link>
          &nbsp; to comment
        </p>
      )}
      <div className="header">
        {user && (
          <div className="list header-div">
            <p>
              <b>{user.displayName}</b>
            </p>
            <textarea
              value={comment}
              placeholder="Add a comment"
              title="Comment"
              onChange={(e) => setComment(e.target.value)}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              <button className="button" onClick={post}>
                Comment
              </button>
              <button className="button" onClick={logout}>
                Log Out
              </button>
            </div>
            {error !== "" && <span className="error">{error}</span>}
            {show && <span>Comment submitted</span>}
            <hr />
          </div>
        )}
        {data.length > 0 ? (
          data.map((doc, index) => (
            <div key={doc._id} className="list">
              <p>
                <b>{doc.author.displayName}</b>
              </p>
              <p>{doc.comment}</p>
              {index < data.length - 1 && <hr />}
            </div>
          ))
        ) : (
          <p>No comments available</p>
        )}
      </div>
    </>
  );
};

export default Discussion;
