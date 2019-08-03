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
    <div>
      <nav class="flex items-center justify-between flex-wrap bg-orange-600 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">ProductHunt + Payfit</span>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <a href="https://api.producthunt.com/v2/docs" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:font-medium mr-4">
            PH GraphQL API Docs
          </a>
          <a href="https://twitter.com/maximesalomon" class="block mt-4 lg:inline-block lg:mt-0 text-white hover:font-medium mr-4">
            Build by maximesalomon
          </a>
        </div>
        <div>
          <a href="https://api.producthunt.com/v2/oauth/authorize?client_id=e14e77d9332895fbb8136b11380eb397f4d7275a39c5e7b3b9b06c2a11eedccc&redirect_uri=https://phpayfit.netlify.com&response_type=code&scope=public+private" class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-orange-600 hover:bg-white mt-4 lg:mt-0">Login</a>
        </div>
      </div>
    </nav>
      <div className="mt-4 ml-8">
        {
          posts.length === 0
          ? <p>Loading...</p>
          : posts.map((post, idx) => {
              return (
                
              <div key={idx} className="relative rounded py-4 mb-3 ml-4 w-8/12 flex border bg-white border-orange-600">
                <p className="text-orange-600 font-medium ml-4 w-8">{post.node.votesCount}</p>
                <p className="ml-4 w-1/4 font-medium">{post.node.name}</p>
                <p className="w-auto inline-block align-middle text-sm">{post.node.tagline}</p>
                <div className="absolute right-0 mr-8"><p className="text-orange-600 align-middle text-sm">Learn more</p></div>
              </div>
              )
          })
        }
      </div>
    </div>
  );
}

export default App;
