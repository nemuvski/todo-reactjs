import React from 'react';
import Header from './Header';
import { Container } from '@material-ui/core';

const App = () => {
  return (
    <>
      <Header />
      <main style={{ marginTop: 64, marginBottom: 64 }}>
        <Container maxWidth='md'>👷</Container>
      </main>
      <footer style={{ textAlign: 'center' }}>&copy; 2021 To Do List</footer>
    </>
  );
};

export default App;
