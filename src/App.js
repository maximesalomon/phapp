import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import Goals from "./components/Goals";

const App = () => {
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    const queryString = window.location.search;
    const userPHToken = queryString.slice(6)
    localStorage.getItem('userPHToken') !== null 
    ? setloggedIn(true)
    : localStorage.setItem('userPHToken', userPHToken);
  }, [loggedIn])

  return (
    <>
      <Navbar loggedIn={loggedIn}/>
      <div className="flex">
        <PostList />
        <Goals loggedIn={loggedIn}/>
      </div>
    </>
  );
};

export default App;