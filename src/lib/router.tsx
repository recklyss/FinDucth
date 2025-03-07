import { useState, useEffect, ReactNode } from 'react';

type Route = {
  path: string;
  component: ReactNode;
};

type RouterProps = {
  routes: Route[];
  defaultRoute: string;
};

export function useRouter(routes: Route[], defaultRoute: string) {
  const [currentPath, setCurrentPath] = useState(
    window.location.pathname || defaultRoute
  );

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, '', to);
    setCurrentPath(to);
  };

  const currentRoute = routes.find(route => route.path === currentPath) ||
    routes.find(route => route.path === defaultRoute);

  return { currentPath, navigate, currentRoute };
}

export function Router({ routes, defaultRoute }: RouterProps) {
  const { currentRoute } = useRouter(routes, defaultRoute);

  return <>{currentRoute?.component}</>;
} 