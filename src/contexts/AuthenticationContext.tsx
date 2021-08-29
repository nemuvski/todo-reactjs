import React, { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../libs/Firebase';
import Loading from '../components/Loading';

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
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<AuthenticationUserId>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(!user ? null : user.uid);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ currentUser }}>
      {isLoading && <Loading />}
      {children}
    </AuthenticationContext.Provider>
  );
};
