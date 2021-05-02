import React from 'react';
import { Button } from '@material-ui/core';
import firebase from 'firebase/app';
import { auth } from '../libs/Firebase';
import GoogleIcon from '../icons/GoogleIcon';

const GuestScreen = () => {
  const handleClick = () => {
    auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
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
