import { User } from '../types/graphql-types';
import { useRouter } from 'next/router';
import { createContext, FunctionComponent, useContext, useEffect, useState } from 'react';
import { clearAuthToken, loadAuthToken } from '@readable/shared/util-auth';

interface IAuthContext {
  user: User | null;
  logout: () => void;
  authenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  authToken: string | null;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  logout: () => null,
  authenticated: false,
  setAuthenticated: () => null,
  authToken: null,
});

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(null);

  const router = useRouter();

  const logoutFn = () => {
    clearAuthToken();
    setAuthenticated(false);
    setAuthToken(null);
    router.push('/');
  };

  useEffect(() => {
    const token = loadAuthToken();
    if (token) {
      setAuthenticated(true);
      setAuthToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: null,
        logout: logoutFn,
        authenticated: authenticated,
        setAuthenticated: setAuthenticated,
        authToken: authToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}