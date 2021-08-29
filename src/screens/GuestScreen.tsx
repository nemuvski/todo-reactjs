import React from 'react';
import { Button } from '@material-ui/core';
import { signInWithRedirect, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../libs/Firebase';
import GoogleIcon from '../icons/GoogleIcon';

const GuestScreen = () => {
  const handleClick = () => {
    signInWithRedirect(auth, new GoogleAuthProvider());
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Button variant='outlined' onClick={handleClick}>
        <GoogleIcon />
        <div style={{ marginLeft: 6 }}>サインイン</div>
      </Button>
    </div>
  );
};

export default GuestScreen;
