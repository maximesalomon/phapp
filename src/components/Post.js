import React from "react";

const Post = ({ post }) => {
  return (
    <div className="relative rounded py-4 mb-3 ml-4 flex border bg-white border-orange-600">
      <p className="text-orange-600 font-medium ml-4 w-8">
        {post.node.votesCount}
      </p>
      <p className="ml-4 w-1/4 font-medium">{post.node.name}</p>
      <p className="w-auto inline-block align-middle text-sm">
        {post.node.tagline}
      </p>
      <div className="absolute right-0 mr-8">
        <a href={post.node.url} className="text-orange-600 align-middle text-sm" target="_blank" rel="noopener noreferrer">Learn more</a>
      </div>
    </div>
  );
};

export default Post;