import React, { useContext } from 'react';
import GuestScreen from '../screens/GuestScreen';
import ToDoScreen from '../screens/ToDoScreen';
import { AuthenticationContext } from '../contexts/AuthenticationContext';

const ScreenSwitcher = () => {
  const { currentUser } = useContext(AuthenticationContext);
  return <>{!currentUser ? <GuestScreen /> : <ToDoScreen />}</>;
};

export default ScreenSwitcher;
