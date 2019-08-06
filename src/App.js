import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import gql from "graphql-tag";
import { setContext } from "apollo-link-context";

import Navbar from "./components/Navbar";
import PostList from "./components/PostList";

var moment = require('moment');

const PH_TOKEN_ADMIN = `${process.env.REACT_APP_PH_TOKEN_ADMIN}`;
const PH_TOKEN_USER = localStorage.getItem('userPHToken') || PH_TOKEN_ADMIN;

console.log(localStorage.getItem('userPHToken'))

const httpLink = new HttpLink({
  uri: "https://api.producthunt.com/v2/api/graphql"
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${PH_TOKEN_USER}`
    }
  };
});

const PH_API = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const App = () => {
  const [loggedIn, setloggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    if(localStorage.getItem('userPHToken') !== null) {
      setloggedIn(true);
    }
  }, [loggedIn])

  const setPostsGoals = (res) => {
    setPosts(res.data.posts.edges)
    setGoals(res.data.goals.edges)
    console.log(res.data.goals.edges)
  }

  PH_API.query({
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
        },
        goals(userId:821){
          edges {
            node {
              createdAt
              title
              completedAt
            }
          }
        }
      }
    `
  })
  .then(res => setPostsGoals(res))

  return (
    <>
      <Navbar />
      <div className="flex">
        <PostList posts={posts} />
        <div className="mt-4 ml-8 font-bold text-2xl rounded border bg-white border-orange-600 w-1/4">
          <h3 className="py-4 px-4">Maker Journal</h3>
          <ul className="font-normal text-base px-4">
            {
              goals.length === 0
              ? <p>Loading...</p>
              : (
                      goals.map((goal, idx) => {
                        const createdAt = goal.node.createdAt;
                        const title = goal.node.title;
                        const checked = goal.node.completedAt ? "checked" : null;
                        return (
                          <div className="pb-4">
                            <p className="font-bold">{moment(createdAt).format("dddd MMM Do YYYY")}</p>
                            <li key={idx}><input type="checkbox" checked={checked}/> {title} <input/></li>
                          </div>
                        )
                      }
                )
              )
            }
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;