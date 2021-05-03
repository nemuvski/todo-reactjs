import React, { useContext } from 'react';
import { ToDoContext } from '../contexts/ToDoContext';
import { List, ListItem, ListItemText } from '@material-ui/core';

const ToDoList = () => {
  const { tasks } = useContext(ToDoContext);

  return (
    <List style={{ marginTop: 24 }}>
      {tasks.map((task) => {
        return (
          <ListItem button key={task.id}>
            <ListItemText primary={task.content} />
          </ListItem>
        );
      })}
    </List>
  );
};

export default ToDoList;
