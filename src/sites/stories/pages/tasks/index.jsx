import React from 'react'

import { 
  P, H1, H2, 
  ModalContainer, 
  ButtonPrimary, 
  ButtonSecondary,
  GridContaier, 
  Card, 
  Input
} from '../../ui/'

import { MemberFormat } from '../../stories.formats'


function Tasks ({dataItems,user,params, apiLoad,...props}) {
  
  //console.log('tasks', user, params)
  React.useEffect(() => {
    async function loadmembers () { 
      let updatedMembers = await apiLoad({format: MemberFormat})
      console.log('updatedMembers', updatedMembers)
    }
    loadmembers()
  },[])

  let userItems = React.useMemo(() => {
    dataItems.reduce((out, project) => {
      //console.log('project', project)
    }, {})
  },[dataItems])

  return (
    <div className='relative mx-auto lg:max-w-7xl '>
      <main className='pb-40'>
        <GridContaier >
          {/* ------- Header ----- */}
          <div className='relative xl:col-span-13 sm:col-span-1 flex items-center pt-4'><H1>Tasks</H1></div>
           <div className='relative xl:col-span-2 sm:col-span-1 flex items-center pt-4'>Select</div>
          {/* ------- Header ----- */}
          <Card className='xl:col-span-15 flex justify-center'>
            <H2>No Tasks</H2>
          </Card>
         
        </GridContaier>
      </main>
    </div>
  )
}

export default Tasks