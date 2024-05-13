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

import { Link, useSubmit, useLocation } from 'react-router-dom'

import {json2DmsForm} from '~/modules/dms/src'
import { useImmer } from "use-immer";

import { StoriesContext } from '../../'

function NewProjectModal ({setOpen, state, setState, createProject }) {
  return (
    <ModalContainer open={state.showNewProject}>
      <H2>Create New Project</H2>
      <P>Name the project and select a project key abbreviation.</P>
      <Input label={'Project Name'} value={state.newProject.name} onChange={(e) => setState(draft => {
        draft.newProject.name = e.target.value
      })}/>
      <Input label={'Description'} value={state.newProject.desc} onChange={(e) => setState(draft => {
        draft.newProject.desc = e.target.value
      })} />
      <div className="mt-8 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto">
        <ButtonSecondary onClick={setOpen}>Cancel</ButtonSecondary>
        <ButtonPrimary onClick={createProject}>Create Project</ButtonPrimary>
      </div>
    </ModalContainer>
  )
}

function Home ({dataItems, ...props}) {
  
  const submit = useSubmit()
  const { pathname } = useLocation()
  const { baseUrl=""} = React.useContext(StoriesContext) || {}

  const [state, setState] = useImmer({
    showNewProject: false,
    newProject: {
      name: '',
      desc: ''
    }
  })

  const createProject = async () => {
    const newItem = state.newProject
    if(newItem?.name?.length > 3 && newItem.desc.length){
      await submit(json2DmsForm(newItem), { method: "post", action: pathname })
      setState({
        showNewProject: false,
        newProject: {
          name: '',
          desc: ''
        }
      });
    }  
  }

  const projects = React.useMemo(()=> {
    return dataItems.filter(d => !d.icebox)
  },[dataItems])


  return (
    <div className='relative mx-auto lg:max-w-7xl '>
      <main className='pb-40'>
        <GridContaier >
          {/* ------- Header ----- */}
          <div className='relative xl:col-span-13 sm:col-span-1 flex items-center pt-4'><H1>Projects</H1></div>
          <div className='flex items-center xl:col-span-2 justify-end pt-4'>
            <ButtonPrimary onClick={(e) => setState({...state,showNewProject: true})}>
              New Project
            </ButtonPrimary>
            <NewProjectModal 
              state={state}
              setState={setState}
              createProject={createProject}
              setOpen={() => setState({...state, showNewProject:!state.showNewProject}) }
            />
          </div>
          {/* ------- Projects ----- */}
          {projects.map(proj => (
            <Card className='xl:col-span-5' key={proj.id}>
              <Link to={`/${baseUrl}/project/${proj.id}`}>
              <H2>{proj.name}</H2>
              <P>{proj.desc}</P>
              </Link>
            </Card>
          ))}
        </GridContaier>
      </main>
    </div>
  )
}

export default Home