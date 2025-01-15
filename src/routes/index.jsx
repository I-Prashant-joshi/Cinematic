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

  const Home = Loadable(lazy(() => import("../Pages/Home")));
  const Shows = Loadable(lazy(() => import("../Pages/Shows")));
  const Search = Loadable(lazy(() => import("../Pages/Search")));
  const ShowDetails = Loadable(lazy(() => import("../Pages/ShowDetails")));
  const Page404 = Loadable(lazy(() => import("../Pages/Page404")));

  
  export default function Router() {
    return useRoutes([
      {
        path: "/",
        element: <App />,
        children: [
          { index: true, element: <Navigate to="/home" replace /> }, // Default route
          { path: "home", element: <Home /> },
          { path: "search", element: <Search /> },
          { path: "showDetail/:name/:id", element: <ShowDetails /> },
          { path: "shows/:name", element: <Shows /> }, 
          { path: "*", element: <Navigate to="/404" replace /> },
        ],
      },
      { path: "*", element: <Page404 /> },
    ]);
  }
  

 
  