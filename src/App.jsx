import React, {useState, useEffect} from 'react'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import { dmsSiteFactory, registerDataType, Selector, adminConfig, registerComponents } from "./modules/dms/src/"
registerDataType("selector", Selector)

import Auth from './sites/auth'

export const getSubdomain = (host) => {
    // ---
    // takes window.location.host and returns subdomain
    // only works with single depth subdomains 
    // ---
    return host.split('.').length > 2 ?
    window.location.host.split('.')[0].toLowerCase() : 
    host.split('.').length > 1 ?  
        window.location.host.split('.')[0].toLowerCase() :  
        false
}

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
    )
}

export default App
