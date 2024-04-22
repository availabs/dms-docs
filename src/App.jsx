import { dmsPageFactory, registerDataType } from "./modules/dms/src"

import siteConfig from './modules/dms/src/patterns/page/siteConfig'
import Selector, { registerComponents } from "./modules/dms/src/patterns/page/selector"
registerDataType("selector", Selector)

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";


const siteCMS = { 
  ...dmsPageFactory(
    siteConfig({
      app: "dms-docs",
      type: "main",
      logo: <div className='flex items-center px-8 h-full text-lg font-bold' >DMS</div>, 
      rightMenu: () => <div> right </div>,
      baseUrl: ""
    }
  ), "/")
}

function App() {
  return (
    <RouterProvider router={createBrowserRouter([siteCMS])} />
  )
}

export default App
