import React, { useContext } from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import { auth } from '../libs/Firebase';

const Header = () => {
  const { currentUser } = useContext(AuthenticationContext);

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' style={{ flexGrow: 1 }}>
          To Do List
        </Typography>
        {currentUser && (
          <Button color='inherit' onClick={() => auth.signOut()}>
            <ExitToAppIcon />
            <div style={{ marginLeft: 6 }}>サインアウト</div>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
