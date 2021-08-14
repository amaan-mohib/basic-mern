import React, { createContext, useContext, useState } from "react";

const DiscussionContext = createContext();

export function useDiscuss() {
  return useContext(DiscussionContext);
}

const DiscussProvider = ({ children }) => {
  const [data, changeData] = useState([]);

  function setData(user) {
    changeData(user);
  }

  const value = {
    data,
    setData,
  };

  return (
    <DiscussionContext.Provider value={value}>
      {children}
    </DiscussionContext.Provider>
  );
};

export default DiscussProvider;
