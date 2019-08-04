import React from "react";

import Post from "./Post";

const PostList = props => {
  return (
    <div className="mt-4 ml-8">
      {props.posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        props.posts.map((post, idx) => {
          return <Post key={idx} post={post} />;
        })
      )}
    </div>
  );
};

export default PostList;