import React  from 'react'

import { Link, useNavigate } from 'react-router-dom'



import { ProjectContext } from '../../pages/project'
import { StoryArcFormat, StoryFormat } from '../../stories.formats.js'

import {
	ArrowRight,
	ArrowLeft,
	Cancel,
	MenuDots,
	MagnifyingGlassCircle
} from '../../ui/icons'

import { 
  P, H1, H2, 
  ModalContainer, 
  ButtonPrimary, 
  ButtonSecondary,
  GridContaier, 
  Card, 
  Input,
  TableInput,
  Table,
  TH,
  TD,
  THead,
  LexicalEdit,
  ButtonMenu,
	MenuItem
} from '../../ui/'


export function StoryModal ({storyId}) {
	const { project, params, apiUpdate, baseUrl } = React.useContext(ProjectContext) || {}
	const navigate = useNavigate()
	
	let {story, arc} = React.useMemo(() => (project?.arcs || []).reduce((out, arc) => {
		let s = (arc?.stories || []).find((s) => s.id == storyId)
		//console.log('testing', s)
		return s ? {story: s, arc} : out
	}, {}), [project,storyId])

	const deleteStory = async (id) => {
		//let storyIndex = arc.stories.findIndex(d => d.id === storyId)
		console.log('test', arc, 
			 {
				id: arc.id,
				stories: arc.stories.filter(d => +d.id !== +storyId)
		})
		await apiUpdate({
			data: {
				id: arc.id,
				stories: arc.stories.filter(d => +d.id !== +storyId)
			},
			config:{
				format:StoryArcFormat
			}
		})
		await apiUpdate({
			data: {
				id
			},
			config: {
				format: StoryFormat
			},
			requestType: 'delete'
		})
		navigate(`${baseUrl}/project/${project.id}`)
	}

	return (
		<ModalContainer open={storyId} width={'sm:max-w-7xl '} start={'row-start-1  mt-10'} >
    	<>
	    	<div className='w-full flex justify-between items-center'>
	    		<div> {story?.title} </div>	
	    		<div className='flex'>
	    			<div className='h-9 w-9 flex items-center justify-center mx-1 border rounded hover:bg-zinc-200'><ArrowLeft className='h-5 w-5' /></div>
	    			<div className='h-9 w-9 flex items-center justify-center mx-1 border rounded hover:bg-zinc-200'><ArrowRight className='h-5 w-5' /></div>
	    			<div className='relative'>  
		    			<ButtonMenu 
		    				location={'right-0'}
		    				width={'w-40'}
		    				button={(
			    				<div className='h-9 w-9 flex items-center justify-center hover:bg-zinc-200 rounded'>
			    					<MenuDots  className='h-5 w-5'/>
			    				</div> 
			    			)}
		    			>
		    				<MenuItem><div className='flex-1 p-2'>Copy Link</div></MenuItem>
		    				{/*<div className='w-full border-b-2 border-zinc-900' />*/}
		    				<MenuItem><div className='flex-1 p-2'> Archive</div></MenuItem>
	    					<MenuItem onClick={() => deleteStory(storyId)}> <div className='flex-1 p-2'>Delete</div></MenuItem>
	    				</ButtonMenu>
	    			</div>
	    			<Link className='h-9 w-9 flex items-center justify-center hover:bg-zinc-200 rounded' to={`${baseUrl}/project/${project.id}`}><Cancel className='h-5 w-5' /></Link>
	    		</div>
	    	</div>
	    	<div className ='flex py-4 '>
	  			<div className='flex-1 text-sm  font-light'>
	  				<LexicalEdit 
	  					value={story?.description}
	  					onChange={v => apiUpdate({data: {id: story.id, description: v}, config: {format: StoryFormat}})}
	  				/>

	  			</div>
	  			<div className='w-64 min-h-64 border'>
	    		</div>
	    	</div>
    	</>
  	</ModalContainer>
	)

}

function Story ({story, updateStory}) {
	const { project } = React.useContext(ProjectContext)
	const { baseUrl } = React.useContext(StoriesContext)
	return (
		<tr className='hover:bg-zinc-50 hover:shadow-md dark:hover:bg-zinc-800'>
			<TD>
				<div className='w-full h-full flex items-center justify-center'>
					<input type='checkbox' />
				</div>
			</TD>
			<TD>
				<div  className='flex group'>
					<div className='flex-1'>
						<TableInput value={story.title} />
					</div>
					<Link 
						to={`/${baseUrl}/project/${project.id}/story/${story.id}`}
						className='flex items-center justify-center text-transparent group-hover:text-zinc-400 px-2 cursor-pointer'
					>
						<MagnifyingGlassCircle />
					</Link>
				</div>
			</TD>
			<TD />
			<TD />
			<TD />
			<TD />
			<TD />
		</tr>
	)
}


// export default {
//     "EditComp": Edit,
//     "ViewComp": View
// }