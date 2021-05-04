import React, { createContext, useContext, useEffect, useState } from 'react';
import ToDoServices from '../services/ToDoService';
import { AuthenticationContext } from './AuthenticationContext';

export type ToDoTask = {
  id: string;
  content: string;
  createdAt: Date;
};

type Props = {
  children?: React.ReactNode;
};

type ContextProps = {
  tasks: Array<ToDoTask>;
  remove: (documentId: string) => void;
};

export const ToDoContext = createContext<ContextProps>({
  tasks: [],
  remove: () => {},
});

export const ToDoProvider = ({ children }: Props) => {
  const { currentUser } = useContext(AuthenticationContext);
  const [tasks, setTasks] = useState<Array<ToDoTask>>([]);

  const remove = (documentId: string) => {
    ToDoServices.remove(currentUser, documentId)
      .then(() => {
        setTasks(
          tasks.filter((task) => {
            return task.id !== documentId;
          })
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    let unmounted = false;

    ToDoServices.get(currentUser)
      .then((tasks) => {
        if (!unmounted) {
          setTasks(tasks);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      unmounted = true;
    };
  }, []);

  return <ToDoContext.Provider value={{ tasks, remove }}>{children}</ToDoContext.Provider>;
};
