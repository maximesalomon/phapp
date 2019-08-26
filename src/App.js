import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import Goals from "./components/Goals";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import gql from "graphql-tag";
import { setContext } from "apollo-link-context";

const httpLink = new HttpLink({
  uri: "https://api.producthunt.com/v2/api/graphql"
});

const authLink = setContext((_, { headers }) => {
  const PH_TOKEN_USER = localStorage.getItem("userPHToken");
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${PH_TOKEN_USER}`
    }
  };
});

const PH_API_USER = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const fetchProfile = () => {
    return (
      PH_API_USER.query({
      query: gql`
        {
          viewer {
            user {
              id
              profileImage
              username
            }
          }
        }
      `
    })
      .then(res => setUser(res.data.viewer.user))
      .then(() => setLoggedIn(true))
    )
  };

  const getPHToken = () => {
    const queryString = window.location.search;
    const PHToken = queryString.slice(6);
    const body = {
      // ADD BODY = https://api.producthunt.com/v2/docs/oauth_user_authentication/oauth_token_use_the_access_grant_code_you_received_through_the_redirect_to_request_an_access_token
      client_id: `${process.env.REACT_APP_PH_API_KEY}`,
      client_secret: `${process.env.REACT_APP_PH_API_SECRET}`,
      redirect_uri: "https://phpayfit.netlify.com",
      code: `${PHToken}`,
      grant_type: "authorization_code"
    };
    axios
      .post(`https://api.producthunt.com/v2/oauth/token`, body)
      .then(res => {
        const userPHToken = res.data.access_token;
        localStorage.setItem("userPHToken", userPHToken);
      })
      .then(() => fetchProfile())
  };

  useEffect(() => {
    localStorage.getItem("userPHToken") !== null
      ? setLoggedIn(true)
      : getPHToken();
  }, [loggedIn]);

  return (
    <>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} name={user.username} />
      <div className="flex">
        <PostList />
        <Goals loggedIn={loggedIn} id={user.id} />
      </div>
    </>
  );
};

export default App;