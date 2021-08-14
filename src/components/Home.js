import React from "react";
import { useAuth } from "../contexts/AuthContext";
import DiscussProvider from "../contexts/DiscussionContext";
import DiscussionList from "./DiscussionList";
import Header from "./Header";

const Home = () => {
  const { user } = useAuth();
  return (
    <DiscussProvider>
      <div className="main">
        {user && <h1>Hello, {user.displayName}</h1>}
        <Header />
        <DiscussionList />
      </div>
    </DiscussProvider>
  );
};

export default Home;
