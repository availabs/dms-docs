import React, {useState, useEffect} from 'react'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import { DmsSite, adminConfig, registerComponents } from "./modules/dms/src/"
import { withAuth, useAuth } from "@availabs/ams"
import ComponentRegistry from '~/component_registry'


registerComponents(ComponentRegistry)
//registerDataType("selector", Selector)

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
    )
}

export default App
