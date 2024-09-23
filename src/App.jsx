import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ComponentRegistry from "~/component_registry";

registerComponents(ComponentRegistry);

import {
  dmsSiteFactory,
  registerDataType,
  Selector,
  adminConfig,
  registerComponents,
} from "./modules/dms/src/";
import Auth from "./sites/auth";
import stories from "./sites/stories";

registerDataType("selector", Selector);
Auth.forEach((f) => {
  f.Component = f.element;
  delete f.element;
});

function App() {
  const [dynamicRoutes, setDynamicRoutes] = useState([]);
  useEffect(() => {
    (async function () {
      const dynamicRoutes = await dmsSiteFactory({
        dmsConfig: adminConfig({
          app: "dms-docs",
          type: "pattern-admin",
          baseUrl: "/list",
        }),
        //theme
      });
      setDynamicRoutes(dynamicRoutes);
    })();
  }, []);

  //console.log('routes',dynamicRoutes)

  const PageNotFoundRoute = {
    path: "/*",
    Component: () => (
      <div className={"w-screen h-screen flex items-center bg-blue-50"}></div>
    ),
  };

  return (
    <RouterProvider
      router={createBrowserRouter([
        ...dynamicRoutes,
        ...stories,
        ...Auth,
        PageNotFoundRoute,
      ])}
    />
  );
}

export default App;
