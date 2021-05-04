import React, { useContext } from 'react';
import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { ToDoContext } from '../contexts/ToDoContext';
import { formatDate } from '../services/DateService';

const ToDoList = () => {
  const { tasks, remove } = useContext(ToDoContext);

  return (
    <List style={{ marginTop: 24 }}>
      {tasks.map((task) => {
        return (
          <ListItem key={task.id}>
            <ListItemText primary={task.content} secondary={formatDate(task.createdAt)} />
            <ListItemSecondaryAction>
              <IconButton edge='end' aria-label='delete' onClick={() => remove(task.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ToDoList;
