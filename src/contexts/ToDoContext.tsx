import React, { createContext, useContext, useEffect, useState } from 'react';
import ToDoServices from '../services/ToDoServices';
import { AuthenticationContext } from './AuthenticationContext';

export type ToDoTask = {
  id: string;
  content: string;
};

type Props = {
  children?: React.ReactNode;
};

type ContextProps = {
  tasks: Array<ToDoTask>;
};

export const ToDoContext = createContext<ContextProps>({
  tasks: [],
});

export const ToDoProvider = ({ children }: Props) => {
  const { currentUser } = useContext(AuthenticationContext);
  const [tasks, setTasks] = useState<Array<ToDoTask>>([]);

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

  return <ToDoContext.Provider value={{ tasks }}>{children}</ToDoContext.Provider>;
};
