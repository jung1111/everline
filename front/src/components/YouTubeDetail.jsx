import React from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

const YouTubeDetail = () => {
  const { id } = useParams();

  return (
    <div className="youtube-detail">
      <YouTube videoId={id} />
    </div>
  );
};

export default YouTubeDetail;
