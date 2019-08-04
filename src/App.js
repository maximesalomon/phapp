import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import gql from "graphql-tag";
import { setContext } from "apollo-link-context";

import Navbar from "./components/Navbar";
import PostList from "./components/PostList";

const PH_TOKEN = `${process.env.REACT_APP_PH_TOKEN}`;

const httpLink = new HttpLink({
  uri: "https://api.producthunt.com/v2/api/graphql"
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${PH_TOKEN}`
    }
  };
});

const PH_API = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = () => {
  const [posts, setPosts] = useState([]);

  let fetchedPosts = [];

  PH_API.query({
    query: gql`
      {
        posts(first: 10) {
          edges {
            node {
              votesCount
              name
              tagline
            }
          }
        }
      }
    `
  })
    .then(res => (fetchedPosts = res.data.posts.edges))
    .then(
      useEffect(() => {
        setPosts(fetchedPosts);
      }, [fetchedPosts])
    );

  return (
    <div>
      <Navbar />
      <PostList posts={posts} />
    </div>
  );
};

export default App;