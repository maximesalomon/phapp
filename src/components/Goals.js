import React, { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import gql from "graphql-tag";
import { setContext } from "apollo-link-context";

var moment = require("moment");

const PH_TOKEN_USER = localStorage.getItem("userPHToken");

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

const PH_API_GOALS = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const Goals = ({ loggedIn }) => {
  const [goals, setGoals] = useState([]);
  useEffect(() => {

  }, [goals])

  if (loggedIn === true) {
    PH_API_GOALS.query({
      query: gql`
        {
          goals(userId: 821) {
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
    }).then(res => setGoals(res.data.goals.edges));
  }

  return (
    <div className="w-1/4">
      <h3 className="py-4 px-4 ml-4 text-2xl font-bold">
        Maker Journal
        <span role="img" aria-label="ship">
          {" "}
          ⛵️
        </span>
      </h3>
      <div className="ml-8 font-bold text-2xl rounded border bg-white border-orange-600">
        <ul className="font-normal text-base px-4 mt-4 mb-4">
          {loggedIn === false ? (
            <div>
              <p className="mb-4">
                You need to be logged in to view your Maker goals
              </p>
              <a href="https://api.producthunt.com/v2/oauth/authorize?client_id=e14e77d9332895fbb8136b11380eb397f4d7275a39c5e7b3b9b06c2a11eedccc&redirect_uri=https://phpayfit.netlify.com&response_type=code&scope=public+private">
                <button className="text-sm px-8 py-3 leading-none border rounded text-orange-600 border-orange-600 hover:border-transparent hover:text-white hover:bg-orange-600 mt-4 lg:mt-0">
                  Login
                </button>
              </a>
            </div>
          ) : goals.length === 0 ? (
            <p>Loading...</p>
          ) : (
            goals.map((goal, idx) => {
              const createdAt = goal.node.createdAt;
              const title = goal.node.title;
              const checked = goal.node.completedAt ? "checked" : null;
              return (
                <div key={idx} className="pb-4">
                  <p className="font-bold">
                    {moment(createdAt).format("dddd MMM Do YYYY")}
                  </p>
                  <li key={idx}>
                    <input type="checkbox" checked={checked} /> {title}{" "}
                    <input />
                  </li>
                </div>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};

export default Goals;