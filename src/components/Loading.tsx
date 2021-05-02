import React from 'react';
import { CircularProgress } from '@material-ui/core';

const Loading = () => {
  return (
    <div
      style={{
        zIndex: 10,
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: 'flex',
        backgroundColor: '#fafafa',
      }}
    >
      <div style={{ margin: 'auto' }}>
        <CircularProgress />
      </div>
    </div>
  );
};

export default Loading;
