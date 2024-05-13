import {Link} from 'react-router-dom'

import { dmsPageFactory, registerDataType } from "../../modules/dms/src"
import siteConfig from '../../modules/dms/src/patterns/page/siteConfig'
import Selector, { registerComponents } from "../../modules/dms/src/patterns/page/selector"
import  { storiesConfig } from '../stories'
registerDataType("selector", Selector)

const API_HOST = 'https://graph.availabs.org'

const dmsDocs = { 
  ...dmsPageFactory(
    siteConfig({
      app: "dms-docs",
      type: "main",
      logo: <div className='flex items-center px-8 h-full text-lg font-bold' >DMS</div>, 
      rightMenu:  <Link className='flex items-center px-8 text-lg font-bold h-12' to='/stories'> right </Link>,
      baseUrl: "",
      API_HOST
    }
  ))
}



export default [
  dmsDocs,
  dmsPageFactory(storiesConfig({baseUrl:'/stories'}))
]
