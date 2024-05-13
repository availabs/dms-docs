import React from 'react'
import { dmsPageFactory, registerDataType } from "../../modules/dms/src"

import siteConfig from '../../modules/dms/src/patterns/page/siteConfig'
import Selector, { registerComponents } from "../../modules/dms/src/patterns/page/selector"
registerDataType("selector", Selector)

const API_HOST = 'https://graph.availabs.org'

import { StoryFormat, ProjectFormat } from './stories.formats'

export const StoriesContext = React.createContext(undefined);

import Home from './pages/home'
import Tasks from './pages/tasks'
import Project from './pages/project'
import Layout from './pages/layout'

export const storiesConfig = (config) => {
  const { baseUrl } = config
  return {
    format: ProjectFormat,
    baseUrl, 
    children: [
      { 
        type: (props) => (
          <StoriesContext.Provider value={{baseUrl, user: props.user}}>
            <Layout 
              logo = {<div className='flex items-center px-8 h-14 bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-100 text-lg font-bold'>Stories</div>}
              rightMenu={<div className='flex items-center px-8 text-lg font-bold h-12 dark:text-zinc-100' to='/stories'> Login </div>}
              baseUrl={baseUrl}
              {...props}
            />
          </StoriesContext.Provider>
        ),
        action: "list",
        path: "/*",
        filter:{
          attributes: ['name', 'desc']
        },
        children: [
          { 
            type: Home,
            action: "view",
            path: "/",
          },
          { 
            type: Tasks,
            action: "view",
            path: "/tasks",
          },
          { 
            type: Project,
            action: "edit",
            path: "/project/:id",
          },
          { 
            type: Project,
            action: "edit",
            path: "/project/:id/story/:storyId",
          }
        ]
      }
    ]
  }
}


export default [dmsPageFactory(storiesConfig({baseUrl:''}))]