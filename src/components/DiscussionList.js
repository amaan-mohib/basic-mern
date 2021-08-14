import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../config";
import { useDiscuss } from "../contexts/DiscussionContext";

const DiscussionList = () => {
  const { data } = useDiscuss();
  const [newData, setData] = useState([]);

  useEffect(() => {
    axios.get(`${API}/post/list`).then((res) => {
      //console.log(res);
      setData(res.data);
    });
  }, [data]);
  return (
    <>
      <h2>Discussions ({newData.length})</h2>
      <div className="header">
        {newData.length > 0 ? (
          newData.map((doc, index) => (
            <div key={doc._id} className="list">
              <Link to={`/t/${doc._id}`}>
                <h2>{doc.topic}</h2>
              </Link>
              <p>{doc.author.displayName}</p>
              {index < newData.length - 1 && <hr />}
            </div>
          ))
        ) : (
          <p>No discussions yet</p>
        )}
      </div>
    </>
  );
};

export default DiscussionList;
