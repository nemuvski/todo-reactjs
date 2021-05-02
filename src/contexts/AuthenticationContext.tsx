import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../libs/Firebase';

export type AuthenticationUserId = string | null;

type Props = {
  children?: React.ReactNode;
};

type ContextProps = {
  currentUser: AuthenticationUserId;
};

export const AuthenticationContext = createContext<ContextProps>({
  currentUser: null,
});

export const AuthenticationProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<AuthenticationUserId>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(!user ? null : user.uid);
    });
    return () => unsubscribe();
  }, []);

  return <AuthenticationContext.Provider value={{ currentUser }}>{children}</AuthenticationContext.Provider>;
};
