import React from 'react';
import ToDoForm from '../components/ToDoForm';
import { ToDoProvider } from '../contexts/ToDoContext';
import ToDoList from '../components/ToDoList';

const ToDoScreen = () => {
  return (
    <ToDoProvider>
      <ToDoForm />
      <ToDoList />
    </ToDoProvider>
  );
};

export default ToDoScreen;
