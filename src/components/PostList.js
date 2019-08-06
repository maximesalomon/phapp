import React from "react";

import Post from "./Post";

const PostList = props => {
  return (
    <div className="mt-4 ml-8 w-8/12">
      <h1 className="ml-4 mb-4 text-2xl font-bold">Today's Products <span role="img" aria-label="cat">🐈</span></h1>
      {props.posts.length === 0 ? (
        <p className="ml-4">Loading...</p>
      ) : (
        props.posts.map((post, idx) => {
          return <Post key={idx} post={post} />;
        })
      )}
    </div>
  );
};

export default PostList;