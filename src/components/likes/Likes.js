import React from 'react';
import Like from './Like';

const Likes = ({ likes }) => {

  return (
    <div className="posts">
      {likes.map((like) => <Like like={like} key={like.id}/>)}
    </div>
  );
};

export default Likes;
