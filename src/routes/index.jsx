import { Suspense, lazy } from "react"; 
import { Navigate, useRoutes } from "react-router-dom"; 

import LoadingScreen from "../Component/LoadingScreen"; 
import App from "../App";
 
const Loadable = (Component) => {
    const WrappedComponent = (props) => (
      <Suspense fallback={<LoadingScreen />}>
        <Component {...props} />
      </Suspense>
    );
    WrappedComponent.displayName = `Loadable(${Component.displayName || Component.name || "Component"})`;
    return WrappedComponent;
  };

export default function Router() { 
  return useRoutes([ 
    {
      path: "/",
      element: <App />,
      children: [
        { element: <Navigate to='home' replace />, index: true },
        { path: "home", element: <Home /> },
        { path: "search", element: <Search /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> }, 
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]); 
} 
const Home = Loadable( lazy(() => import("../Pages/Home")));
const Page404 = Loadable(lazy(() => import("../Pages/Page404")));
const Search = Loadable(lazy(() => import("../Pages/Search")));

 
 