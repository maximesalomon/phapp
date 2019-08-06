import React, { useState } from "react";
import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import gql from "graphql-tag";
import { setContext } from "apollo-link-context";

var moment = require('moment');

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

const Goals = () => {
    const [goals, setGoals] = useState([]);

    PH_API_GOALS.query({
        query: gql`
        {
            goals(userId: 821, completed: false) {
            edges {
                node {
                title
                }
            }
            }
        }
        `
    }).then(res => setGoals(res.data.goals.edges));

  return (
    <div className="mt-4 ml-8 font-bold text-2xl rounded border bg-white border-orange-600 w-1/4">
      <h3 className="py-4 px-4">Maker Journal</h3>
      <ul className="font-normal text-base px-4">
        {goals.length === 0 ? (
          <p>Loading...</p>
        ) : (
          goals.map((goal, idx) => {
            const createdAt = goal.node.createdAt;
            const title = goal.node.title;
            const checked = goal.node.completedAt ? "checked" : null;
            return (
              <div className="pb-4">
                <p className="font-bold">
                  {moment(createdAt).format("dddd MMM Do YYYY")}
                </p>
                <li key={idx}>
                  <input type="checkbox" checked={checked} /> {title} <input />
                </li>
              </div>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default Goals;