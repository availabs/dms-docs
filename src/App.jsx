import React from 'react'

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

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

const Sites = {
  'docs': dmsDocs,
  'stories': stories
}


function App() {
  const SUBDOMAIN = getSubdomain(window.location.host)

  const site = React.useMemo(() => {
      return Sites?.[SUBDOMAIN] || Sites['stories']
  },[SUBDOMAIN])

  return (
    <RouterProvider router={createBrowserRouter([...site])} />
  )
}

export default App
