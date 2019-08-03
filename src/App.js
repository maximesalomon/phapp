import React, { useState, useEffect } from 'react';
// import PropTypes from "prop-types";
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import gql from "graphql-tag";
import { setContext } from "apollo-link-context";

const PH_TOKEN =`${process.env.REACT_APP_PH_TOKEN}`

  const httpLink = new HttpLink({ uri: "https://api.producthunt.com/v2/api/graphql" });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${PH_TOKEN}`
      }
    }
  });

  const PH_API = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

function App() {
  const [posts, setPosts] = useState([]);

  let fetchedPosts = []

  PH_API
    .query({
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
    .then(res => fetchedPosts = res.data.posts.edges)
    .then(useEffect(() => {
      setPosts(fetchedPosts)
    }, [fetchedPosts]))

  return (
    <div className="container">
      <h1 className="text-orange-600 mt-4 mb-4 px-4 text-3xl font-medium">ProductHunt + Payfit</h1>
        {
          posts.map((post, idx) => {
              return (
              <div className="rounded py-4 mb-3 ml-4 flex border bg-white border-orange-600 " key={idx}>
                <p className="text-orange-600 font-medium ml-4 w-8">{post.node.votesCount}</p>
                <p className="ml-4 w-64 font-medium">{post.node.name}</p>
                <p className="w-auto inline-block align-middle text-sm">{post.node.tagline}</p>
                <p className="ml-4 text-orange-600 align-middle text-sm">Learn more</p>
              </div>
              )
          })
        }
    </div>
  );
}

export default App;
