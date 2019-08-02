import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PH_API = "https://api.producthunt.com/v1/"
const PH_TOKEN =`${process.env.REACT_APP_PH_TOKEN}`

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let config = {
      headers: {
        'Authorization': "Bearer " + PH_TOKEN
      }
    }
    axios
      .get(PH_API + "/posts", config)
      .then(res => {
        setPosts(res.data.posts)
      })
  }, [])

  return (
    <div className="container">
      <h1 className="text-red-700">ProductHunt + Payfit</h1>
      <div>
        {
          posts.map((post, idx) => {
              return (
              <div key={idx}>
                <p>{post.votes_count} | {post.name} - {post.tagline}</p>
              </div>
              )
          })
        }
      </div>
    </div>
  );
}

export default App;
