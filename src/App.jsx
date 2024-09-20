import React, {useState, useEffect} from 'react'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

<<<<<<< HEAD
import { DmsSite, adminConfig, registerComponents } from "./modules/dms/src/"
import { withAuth, useAuth } from "@availabs/ams"
import ComponentRegistry from '~/component_registry'


registerComponents(ComponentRegistry)
//registerDataType("selector", Selector)
=======
import { dmsSiteFactory, registerDataType, Selector, adminConfig, registerComponents } from "./modules/dms/src/"
registerDataType("selector", Selector)
>>>>>>> 9e1d7473304de56056ac7c92f2a6f413941fa399

import Auth from './sites/auth'

import dmsDocs from './sites/dms'
import stories from './sites/stories'

// const Sites = {
//   'docs': dmsDocs,
//   'stories': stories
// }

//console.log('test', Auth)

Auth.forEach(f => {
  f.Component = f.element 
  delete f.element
})

function App() {
<<<<<<< HEAD

    const PageNotFoundRoute = {
        path: "/*",
        Component: () => (<div className={'w-screen h-screen flex items-center bg-blue-50'}>404</div>)
    }

    return (
        <DmsSite
            dmsConfig={
                adminConfig({
                    app: 'dms-docs',
                    type: 'pattern-admin',
                    baseUrl: '/list'
                })

            }
            authWrapper={withAuth}
            routes={[
                ...Auth, 
                //...stories,
                PageNotFoundRoute

            ]}
        />
=======
  const SUBDOMAIN = getSubdomain(window.location.host)
  const [dynamicRoutes, setDynamicRoutes] = useState([]);
    useEffect(() => {
        (async function() {
            const dynamicRoutes = await dmsSiteFactory({
                dmsConfig:adminConfig({
                    app: 'dms-docs',
                    type: 'pattern-admin',
                    baseUrl: '/list'
                }),
                //theme   
            });
            setDynamicRoutes(dynamicRoutes);
        })()
    }, []);

    //console.log('routes',dynamicRoutes)

    const PageNotFoundRoute = {
        path: "/*",
        Component: () => (<div className={'w-screen h-screen flex items-center bg-blue-50'}></div>)
    }

    return (
        <RouterProvider router={createBrowserRouter([
          ...dynamicRoutes,
          //...stories,
          ...Auth,
          PageNotFoundRoute ])} />
>>>>>>> 9e1d7473304de56056ac7c92f2a6f413941fa399
    )
}

export default App
