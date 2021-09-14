import { Typography } from '@material-ui/core';
import React from 'react';
import video from './video/App.mp4';
import ReactPlayer from 'react-player';

export default function SearchInfo() {
  return (
    <div>
      <Typography variant="h2">
          Search
      </Typography>
      <Typography>
          Some text
          <ReactPlayer url={video} width="50%" height="50%" controls={true} />
      </Typography>
    </div>
  );
}