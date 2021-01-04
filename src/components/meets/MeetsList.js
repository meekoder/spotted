import React from 'react';
import Meet from './Meet';

const MeetsList = ({ meets }) => {
  return (
    <div className="posts">
      {meets.map((meet) => <Meet meet={meet} key={meet.id} />)}
    </div>
  );
};

export default MeetsList;
