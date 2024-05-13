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


function Tasks ({dataItems, ...props}) {
  
  return (
    <div className='relative mx-auto lg:max-w-7xl '>
      <main className='pb-40'>
        <GridContaier >
          {/* ------- Header ----- */}
          <div className='relative xl:col-span-15 sm:col-span-2 flex items-center pt-4'><H1>Tasks</H1></div>
          
          {/* ------- Header ----- */}
          <Card className='xl:col-span-5'>
            <H2>No Tasks</H2>
          </Card>
         
        </GridContaier>
      </main>
    </div>
  )
}

export default Tasks