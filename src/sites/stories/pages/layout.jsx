
import React from 'react'
import Layout from '../ui/layout/layout'

const Wrapper = ({dataItems, children, baseUrl, logo, rightMenu}) => {
  
  const projects = React.useMemo(()=> {
    return dataItems.filter(d => !d.icebox)
  },[dataItems])

  const menuItems = [
    {
      id: 'Home',
      name: 'Home',
      path: `${baseUrl}/`,
    },
    {
      id: 'tasks',
      name: 'Tasks',
      path: `${baseUrl}/tasks`
    },
   
    {
      id: 'projects',
      name: 'PROJECTS',
      className: 'font-bold cursor-pointer text-[10px] spacing-widest px-5 pb-2 pt-6  dark:text-zinc-100'
    },
    ...projects.map(d => {
      return {
          id: d.id,
          path: `${baseUrl}/project/${d.id}`,
          name: `${d.name}`,
      }
    })
  ]

  return (
    <div className='bg-zinc-50 font-sans dark:bg-zinc-950 min-h-screen overflow-hidden'>
      <Layout 
        topNav={{ position: 'fixed', rightMenu }}
        sideNav={{ size: 'compact', logo, menuItems}}
      >
        {children}
      </Layout>
    </div>
  )
}

export default Wrapper