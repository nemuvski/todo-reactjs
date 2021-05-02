import React from 'react';
import Header from './Header';
import { Container } from '@material-ui/core';
import { AuthenticationProvider } from '../contexts/AuthenticationContext';
import ScreenSwitcher from './ScreenSwitcher';

const App = () => {
  return (
    <AuthenticationProvider>
      <Header />
      <main style={{ marginTop: 64, marginBottom: 64 }}>
        <Container maxWidth='md'>
          <ScreenSwitcher />
        </Container>
      </main>
      <footer style={{ textAlign: 'center' }}>&copy; 2021 To Do List</footer>
    </AuthenticationProvider>
  );
};

export default App;
