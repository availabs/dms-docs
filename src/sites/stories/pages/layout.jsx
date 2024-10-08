import React, {useContext} from 'react'
import Layout from '../ui/layout/layout'
import { StoriesContext } from '../index'

const Wrapper = ({dataItems, apiLoad, children, baseUrl, logo, rightMenu, }) => {
  const { format: ProjectFormat } = useContext(StoriesContext)
  const [projects,setProjects] = React.useState([])

  React.useEffect(() => {
    const loadProjects = async () => {
      // console.log('gonna load')
      let projdata = await apiLoad({
        format: ProjectFormat, 
        children: [
        { 
          action: "list",
          path: "/*",
          filter:{
            attributes: ['name', 'desc']
          },
        }]
      })
      setProjects(projdata.filter(d => !d.icebox))
    }
    loadProjects()
  },[dataItems])

  //
  let navUrl = baseUrl.replace('/users','')
  //console.log('navUrl',navUrl, baseUrl)

  const menuItems = [
    {
      id: 'Home',
      name: 'Home',
      path: `${navUrl}/`,
    },
    {
      id: 'tasks',
      name: 'Tasks',
      path: `${navUrl}/tasks`
    },
   
    {
      id: 'projects',
      name: 'PROJECTS',
      className: 'font-bold cursor-pointer text-[10px] spacing-widest px-5 pb-2 pt-6  dark:text-zinc-100'
    },
    ...projects.map(d => {
      return {
          id: d.id,
          path: `${navUrl}/project/${d.id}`,
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