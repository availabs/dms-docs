import React from 'react'
import { dmsPageFactory, registerDataType } from "../../modules/dms/src"
import { Link } from 'react-router-dom'
import AuthMenu from './ui/AuthMenu'

import { withAuth } from "@availabs/ams"

import { Selector,  registerComponents } from "../../modules/dms/src"
registerDataType("selector", Selector)

const API_HOST = 'https://graph.availabs.org'

import { StoryFormat, ProjectFormat, MemberFormat } from './stories.formats'

export const StoriesContext = React.createContext(undefined);

import Home from './pages/home'
import Tasks from './pages/tasks'
import Project from './pages/project'
import ManageUsers from './pages/users/manage'
import Layout from './pages/layout'

export const storiesConfig = (config) => {

  let { baseUrl, AUTH_HOST = 'https://availauth.availabs.org' } = config
  //console.log('test', AUTH_HOST)
  baseUrl = baseUrl === '/' ? '' : baseUrl

  return {
    format: ProjectFormat,
    baseUrl, 
    children: [
      { 
        type: (props) => (
          <StoriesContext.Provider value={{baseUrl, user: props.user, AUTH_HOST}}>
            <Layout 
              logo = {<div className='flex items-center px-8 h-14 bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-100 text-lg font-bold'>Stories</div>}
              rightMenu={<AuthMenu />}
              baseUrl={baseUrl}
              {...props}
            />
          </StoriesContext.Provider>
        ),
        action: "list",
        path: "/*",
        authLevel: 1,
        filter:{
          attributes: ['name', 'desc']
        },
        children: [
          { 
            type: Home,
            action: "view",
            path: "",
          },
          { 
            type: Tasks,
            action: "edit",
            path: "tasks",
          },
          { 
            type: Tasks,
            action: "edit",
            path: "tasks/:userId",

          },
          { 
            type: Project,
            action: "edit",
            path: "project/:id",
          },
          { 
            type: Project,
            action: "edit",
            path: "project/:id/story/:storyId",
          },
          // { 
          //   type: ManageUsers,
          //   action: "edit",
          //   path: "/manage-users",
          // },
        ]
      }
    ]
  }
}

export const membersConfig = (config) => {
  const { baseUrl, AUTH_HOST = 'https://availauth.availabs.org' } = config
  //console.log('test', AUTH_HOST)
  return {
    format: MemberFormat,
    baseUrl, 
    children: [
      { 
        type: (props) => (
          <StoriesContext.Provider value={{baseUrl, user: props.user, AUTH_HOST}}>
            <Layout 
              logo = {<div className='flex items-center px-8 h-14 bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-100 text-lg font-bold'>Stories</div>}
              rightMenu={<AuthMenu />}
              baseUrl={baseUrl}
              {...props}
            />
          </StoriesContext.Provider>
        ),
        action: "list",
        path: "/*",
        authLevel:10,
        children: [
          { 
            type: ManageUsers,
            action: "edit",
            path: "/manage",
          },
        ]
      }
    ]
  }
}


export default [
  dmsPageFactory(storiesConfig({baseUrl:''}),withAuth), 
  dmsPageFactory(membersConfig({baseUrl:'/users'}),withAuth)
]