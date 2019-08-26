import React, { useState, useEffect } from "react";
import axios from 'axios';

import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import Goals from "./components/Goals";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const getPHToken = () => {
    const queryString = window.location.search;
    const PHToken = queryString.slice(6)
    const body = {
          // ADD BODY = https://api.producthunt.com/v2/docs/oauth_user_authentication/oauth_token_use_the_access_grant_code_you_received_through_the_redirect_to_request_an_access_token
          "client_id": `${process.env.REACT_APP_PH_API_KEY}`,
          "client_secret": `${process.env.REACT_APP_PH_API_SECRET}`,
          "redirect_uri": "https://phpayfit.netlify.com",
          "code": `${PHToken}`,
          "grant_type": "authorization_code"
        }
    axios.post(`https://api.producthunt.com/v2/oauth/token`, body)
      .then(res => {
        const userPHToken = res.data.access_token;
        localStorage.setItem('userPHToken', userPHToken)
        setLoggedIn(true)
      })
  }

  useEffect(() => {
    localStorage.getItem('userPHToken') !== null 
    ? setLoggedIn(true)
    : getPHToken()
  }, [loggedIn])

  return (
    <>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
      <div className="flex">
        <PostList />
        <Goals loggedIn={loggedIn}/>
      </div>
    </>
  );
};

export default App;