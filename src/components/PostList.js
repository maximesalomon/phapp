import React, { useState } from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import gql from "graphql-tag";
import { setContext } from "apollo-link-context";

import Post from "./Post";

const PH_TOKEN_ADMIN = `${process.env.REACT_APP_PH_TOKEN_ADMIN}`;

const httpLink = new HttpLink({
  uri: "https://api.producthunt.com/v2/api/graphql"
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${PH_TOKEN_ADMIN}`
    }
  };
});

const PH_API_POSTS = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const PostList = () => {
  const [posts, setPosts] = useState([]);

  PH_API_POSTS.query({
    query: gql`
      {
        posts(first: 10) {
          edges {
            node {
              votesCount
              name
              tagline
              url
            }
          }
        }
      }
    `
  }).then(res => setPosts(res.data.posts.edges));

  return (
    <div className="mt-4 ml-8 w-8/12">
      <h1 className="ml-4 mb-4 text-2xl font-bold">
        Today's Products{" "}
        <span role="img" aria-label="cat">
          🐈
        </span>
      </h1>
      {posts.length === 0 ? (
        <p className="ml-4">Loading...</p>
      ) : (
        posts.map((post, idx) => {
          return <Post key={idx} post={post} />;
        })
      )}
    </div>
  );
};

export default PostList;