import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { useAuth } from './useAuth';

type AuthRouteProps = {
  children: ReactElement;
  redirectPath?: string;
  replaceComponent?: ReactElement;
};

export const AuthRoute = ({ children, redirectPath, replaceComponent }: AuthRouteProps) => {
  const router = useRouter();

  const { authenticated, loading } = useAuth();

  // TODO(zlrlo): 로딩 UI 수정 필요
  if (loading) {
    return <div>loading...</div>;
  }

  const render = () => {
    if (authenticated) {
      return children;
    }

    if (redirectPath) {
      router.push(redirectPath);
      return;
    }

    if (replaceComponent) {
      return replaceComponent;
    }

    return null;
  };

  return <>{render()}</>;
};
