import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  DmsSite,
  registerDataType,
  Selector,
  adminConfig,
  registerComponents,
} from "./modules/dms/src/";
import Auth from "./sites/auth";
import stories from "./sites/stories";

//import ComponentRegistry from "~/component_registry";

import { withAuth } from "@availabs/ams"

registerDataType("selector", Selector);

//registerComponents(ComponentRegistry);

Auth.forEach((f) => {
  f.Component = f.element;
  delete f.element;
});


function App() {
    return (
      <DmsSite
        dmsConfig = {
          adminConfig({
            app: 'dms-docs',
            type: 'pattern-admin'
          })
        }
        // defaultData={siteData}
        authWrapper={withAuth}
        // themes={themes}
        // API_HOST='http://localhost:4444'
        
        routes={[
          ...stories,
          ...Auth
        ]} 
      />
    )
}

export default App

