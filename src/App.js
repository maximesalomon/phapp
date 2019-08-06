import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import Goals from "./components/Goals";

const App = () => {
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('userPHToken') !== null) {
      setloggedIn(true);
    }
  }, [loggedIn])

  return (
    <>
      <Navbar loggedIn={loggedIn}/>
      <div className="flex">
        <PostList />
        <Goals />
      </div>
    </>
  );
};

export default App;